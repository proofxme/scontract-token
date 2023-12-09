import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

// Fixture function for deploying the contract
async function deployFixture() {
  const [deployerWallet] = await hre.viem.getWalletClients();
  const myToken = await hre.viem.deployContract("PoXme", [deployerWallet.account.address]);

  return { myToken };
}

describe("PoXme deploy", function () {
  it("should deploy the contract and initialize it with the correct total supply", async function () {
    // Load the contract instance using the fixture function
    const { myToken } = await loadFixture(deployFixture);

    // Get the initial supply
    const totalSupply = await myToken.read.totalSupply();

    // Assert that the supply is as expected from the contract deployment
    assert.equal(totalSupply.toString(), BigInt(100 * 10 ** 18).toString());
  });
});