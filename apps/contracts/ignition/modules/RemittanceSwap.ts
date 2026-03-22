import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RemittanceSwapModule = buildModule("RemittanceSwapModule", (m) => {
  const remittanceSwap = m.contract("RemittanceSwap");
  return { remittanceSwap };
});

export default RemittanceSwapModule;
