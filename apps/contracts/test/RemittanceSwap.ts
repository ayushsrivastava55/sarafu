import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseUnits } from "viem";

describe("RemittanceSwap", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const remittanceSwap = await hre.viem.deployContract("RemittanceSwap");
    const token = await hre.viem.deployContract("MockERC20", [
      "Mock Dollar",
      "MUSD",
      parseUnits("1000000", 18),
    ]);

    return {
      owner,
      otherAccount,
      publicClient,
      remittanceSwap,
      token,
    };
  }

  it("restricts recordRemittance to the owner", async function () {
    const { remittanceSwap, otherAccount } = await loadFixture(deployFixture);
    const unauthorized = await hre.viem.getContractAt("RemittanceSwap", remittanceSwap.address, {
      client: { wallet: otherAccount },
    });

    await expect(
      unauthorized.write.recordRemittance([
        otherAccount.account.address,
        otherAccount.account.address,
        otherAccount.account.address,
        1n,
        2n,
      ]),
    ).to.be.rejectedWith("OwnableUnauthorizedAccount");
  });

  it("restricts withdraw to the owner", async function () {
    const { remittanceSwap, otherAccount } = await loadFixture(deployFixture);
    const unauthorized = await hre.viem.getContractAt("RemittanceSwap", remittanceSwap.address, {
      client: { wallet: otherAccount },
    });

    await expect(
      unauthorized.write.withdraw([otherAccount.account.address, 1n]),
    ).to.be.rejectedWith("OwnableUnauthorizedAccount");
  });

  it("accepts deposits and emits FundsDeposited", async function () {
    const { remittanceSwap, token, publicClient, owner } = await loadFixture(deployFixture);
    const amount = parseUnits("250", 18);

    const approveHash = await token.write.approve([remittanceSwap.address, amount]);
    await publicClient.waitForTransactionReceipt({ hash: approveHash });

    const depositHash = await remittanceSwap.write.deposit([token.address, amount]);
    await publicClient.waitForTransactionReceipt({ hash: depositHash });

    const balance = await token.read.balanceOf([remittanceSwap.address]);
    expect(balance).to.equal(amount);

    const events = await remittanceSwap.getEvents.FundsDeposited();
    expect(events).to.have.lengthOf(1);
    expect(getAddress(events[0].args.token!)).to.equal(getAddress(token.address));
    expect(getAddress(events[0].args.from!)).to.equal(getAddress(owner.account.address));
    expect(events[0].args.amount).to.equal(amount);
  });

  it("withdraws deposited funds and emits FundsWithdrawn", async function () {
    const { remittanceSwap, token, publicClient, owner } = await loadFixture(deployFixture);
    const amount = parseUnits("150", 18);

    const approveHash = await token.write.approve([remittanceSwap.address, amount]);
    await publicClient.waitForTransactionReceipt({ hash: approveHash });

    const depositHash = await remittanceSwap.write.deposit([token.address, amount]);
    await publicClient.waitForTransactionReceipt({ hash: depositHash });

    const withdrawHash = await remittanceSwap.write.withdraw([token.address, amount]);
    await publicClient.waitForTransactionReceipt({ hash: withdrawHash });

    const contractBalance = await token.read.balanceOf([remittanceSwap.address]);
    expect(contractBalance).to.equal(0n);

    const events = await remittanceSwap.getEvents.FundsWithdrawn();
    expect(events).to.have.lengthOf(1);
    expect(getAddress(events[0].args.token!)).to.equal(getAddress(token.address));
    expect(getAddress(events[0].args.to!)).to.equal(getAddress(owner.account.address));
    expect(events[0].args.amount).to.equal(amount);
  });

  it("tracks remittance stats and preserves remittance data", async function () {
    const { remittanceSwap, publicClient, owner, otherAccount } = await loadFixture(deployFixture);
    const amountIn = parseUnits("50", 18);
    const amountOut = parseUnits("6408.58", 18);

    const hash = await remittanceSwap.write.recordRemittance([
      otherAccount.account.address,
      owner.account.address,
      otherAccount.account.address,
      amountIn,
      amountOut,
    ]);
    await publicClient.waitForTransactionReceipt({ hash });

    const stats = await remittanceSwap.read.getStats();
    expect(stats[0]).to.equal(1n);
    expect(stats[1]).to.equal(amountIn);

    const remittance = await remittanceSwap.read.getRemittance([0n]);
    expect(getAddress(remittance.sender)).to.equal(getAddress(owner.account.address));
    expect(getAddress(remittance.recipient)).to.equal(getAddress(otherAccount.account.address));
    expect(getAddress(remittance.tokenIn)).to.equal(getAddress(owner.account.address));
    expect(getAddress(remittance.tokenOut)).to.equal(getAddress(otherAccount.account.address));
    expect(remittance.amountIn).to.equal(amountIn);
    expect(remittance.amountOut).to.equal(amountOut);
    expect(remittance.timestamp > 0n).to.equal(true);
  });

  it("emits RemittanceSent when a remittance is recorded", async function () {
    const { remittanceSwap, publicClient, owner, otherAccount } = await loadFixture(deployFixture);

    const hash = await remittanceSwap.write.recordRemittance([
      otherAccount.account.address,
      owner.account.address,
      otherAccount.account.address,
      1n,
      2n,
    ]);
    await publicClient.waitForTransactionReceipt({ hash });

    const events = await remittanceSwap.getEvents.RemittanceSent();
    expect(events).to.have.lengthOf(1);
    expect(getAddress(events[0].args.sender!)).to.equal(getAddress(owner.account.address));
    expect(getAddress(events[0].args.recipient!)).to.equal(getAddress(otherAccount.account.address));
    expect(events[0].args.amountIn).to.equal(1n);
    expect(events[0].args.amountOut).to.equal(2n);
  });
});
