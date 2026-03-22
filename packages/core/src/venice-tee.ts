import { randomBytes } from "crypto";
import { decodeJwt } from "jose";
import { verifyMessage } from "ethers";

type FetchLike = typeof fetch;

interface TeeAttestationPayload {
  nonce: string;
  signingAddress?: `0x${string}`;
  raw: unknown;
  claims?: Record<string, unknown>;
}

interface TeeVerificationResult {
  privacyMode: "zero-retention" | "tee-verified" | "tee-unverified";
  attestationAddress?: `0x${string}`;
  signatureValid?: boolean;
  signatureUrl?: string;
  attestation?: unknown;
}

function getBaseUrl(): string {
  // Venice exposes TEE attestation directly through its own API, NOT through NEAR AI
  return process.env.VENICE_TEE_BASE_URL || "https://api.venice.ai/api/v1";
}

function getApiKey(): string | undefined {
  return process.env.VENICE_API_KEY;
}

function getModel(): string {
  // TEE models use e2ee- prefix on Venice
  return process.env.VENICE_TEE_MODEL || "zai-org-glm-4.7";
}

function getSigningAlgo(): string {
  return process.env.VENICE_TEE_SIGNING_ALGO || "ecdsa";
}

function isEnabled(): boolean {
  return process.env.VENICE_ENABLE_TEE === "true";
}

function randomNonce() {
  // Venice requires exactly 32 bytes (64 hex chars)
  return randomBytes(32).toString("hex");
}

function normalizeObject(input: unknown): Record<string, unknown> | null {
  return input && typeof input === "object" ? (input as Record<string, unknown>) : null;
}

function maybeDecodeJwt(value: string): Record<string, unknown> | undefined {
  try {
    return decodeJwt(value) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function extractSigningAddress(source: Record<string, unknown> | undefined): `0x${string}` | undefined {
  if (!source) {
    return undefined;
  }

  // Venice returns signing_address or signing_key
  const direct = source.signing_address ?? source.signing_key ?? source.signingAddress ?? source.address;
  if (typeof direct === "string" && direct.startsWith("0x")) {
    return direct as `0x${string}`;
  }

  const nested = normalizeObject(source.attestation) || normalizeObject(source.payload);
  if (!nested) {
    return undefined;
  }

  const nestedValue = nested.signing_address ?? nested.signing_key ?? nested.signingAddress ?? nested.address;
  if (typeof nestedValue === "string" && nestedValue.startsWith("0x")) {
    return nestedValue as `0x${string}`;
  }

  return undefined;
}

function extractSignaturePayload(raw: unknown): { signature?: string; message?: string; url?: string } {
  const payload = normalizeObject(raw);
  if (!payload) {
    return {};
  }

  const signature = typeof payload.signature === "string" ? payload.signature : undefined;
  const message =
    typeof payload.text === "string"
      ? payload.text
      : typeof payload.message === "string"
        ? payload.message
        : typeof payload.payload === "string"
          ? payload.payload
          : undefined;
  const url = typeof payload.url === "string" ? payload.url : undefined;

  return { signature, message, url };
}

export class VeniceTeeVerifier {
  private sessionAttestationPromise?: Promise<TeeAttestationPayload | null>;

  constructor(private readonly fetchImpl: FetchLike = fetch) {}

  private async fetchSessionAttestation(): Promise<TeeAttestationPayload | null> {
    if (!isEnabled()) {
      return null;
    }

    const nonce = randomNonce();
    const apiKey = getApiKey();

    // Venice TEE attestation endpoint: GET /tee/attestation
    const url = new URL(`${getBaseUrl()}/tee/attestation`);
    url.searchParams.set("model", getModel());
    url.searchParams.set("nonce", nonce);

    try {
      const headers: Record<string, string> = { accept: "application/json" };
      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }

      const response = await this.fetchImpl(url.toString(), { headers });

      if (!response.ok) {
        return null;
      }

      const raw = (await response.json()) as unknown;
      const object = normalizeObject(raw);

      // Venice returns: verified, signing_key, signing_address, intel_quote, nvidia_payload
      const claims = object || undefined;
      const signingAddress = extractSigningAddress(claims || undefined);

      return {
        nonce,
        signingAddress,
        raw,
        claims,
      };
    } catch {
      return null;
    }
  }

  private getSessionAttestation() {
    if (!this.sessionAttestationPromise) {
      this.sessionAttestationPromise = this.fetchSessionAttestation();
    }

    return this.sessionAttestationPromise;
  }

  private async fetchResponseSignature(requestId: string): Promise<unknown> {
    const apiKey = getApiKey();

    // Venice TEE signature endpoint: GET /tee/signature?model=...&request_id=...
    const url = new URL(`${getBaseUrl()}/tee/signature`);
    url.searchParams.set("model", getModel());
    url.searchParams.set("request_id", requestId);

    const headers: Record<string, string> = { accept: "application/json" };
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await this.fetchImpl(url.toString(), { headers });

    if (!response.ok) {
      throw new Error("TEE signature lookup failed.");
    }

    return response.json();
  }

  async buildMetadata(input: {
    responseId?: string;
    model?: string;
    assistantText?: string;
    rawAttestation?: unknown;
  }): Promise<TeeVerificationResult> {
    if (!isEnabled()) {
      return {
        privacyMode: "zero-retention",
        attestation: input.rawAttestation,
      };
    }

    const sessionAttestation = await this.getSessionAttestation();
    if (!input.responseId || !sessionAttestation?.signingAddress) {
      return {
        privacyMode: "tee-unverified",
        attestationAddress: sessionAttestation?.signingAddress,
        attestation: sessionAttestation?.raw ?? input.rawAttestation,
      };
    }

    try {
      const rawSignature = await this.fetchResponseSignature(input.responseId);
      const payload = extractSignaturePayload(rawSignature);
      // Venice signature returns { text: "requestHash:responseHash", signature: "0x..." }
      const message = payload.message || input.assistantText || input.responseId;

      if (!payload.signature) {
        return {
          privacyMode: "tee-unverified",
          attestationAddress: sessionAttestation.signingAddress,
          signatureUrl: payload.url,
          attestation: {
            session: sessionAttestation.raw,
            response: rawSignature,
          },
        };
      }

      const recovered = verifyMessage(message, payload.signature);
      const signatureValid = recovered.toLowerCase() === sessionAttestation.signingAddress.toLowerCase();

      return {
        privacyMode: signatureValid ? "tee-verified" : "tee-unverified",
        attestationAddress: sessionAttestation.signingAddress,
        signatureValid,
        signatureUrl: payload.url,
        attestation: {
          session: sessionAttestation.raw,
          response: rawSignature,
        },
      };
    } catch {
      return {
        privacyMode: "tee-unverified",
        attestationAddress: sessionAttestation.signingAddress,
        attestation: sessionAttestation.raw,
      };
    }
  }
}
