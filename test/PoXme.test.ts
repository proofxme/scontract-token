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
  it("should have minted the maximum balance to the deployer", async function () {
    // Load the contract instance using the fixture function
    const { myToken } = await loadFixture(deployFixture);

    // get the deployer wallet
    const [deployerWallet] = await hre.viem.getWalletClients();

    // check the balance of the deployer
    const balance = await myToken.read.balanceOf([deployerWallet.account.address]);
    assert.equal(balance.toString(), BigInt(100 * 10 ** 18).toString());
  });
  it("should have the proper token symbol", async function () {
    // Load the contract instance using the fixture function
    const { myToken } = await loadFixture(deployFixture);

    // check the symbol
    const symbol = await myToken.read.symbol();
    assert.equal(symbol, "PoXme");
  })
  it("should have the proper token name", async function () {
    // Load the contract instance using the fixture function
    const { myToken } = await loadFixture(deployFixture);

    // check the name
    const name = await myToken.read.name();
    assert.equal(name, "PoXme");
  })
  it("should have the proper protocol URI", async function () {
    // Load the contract instance using the fixture function
    const { myToken } = await loadFixture(deployFixture);

    // check the name
    const uri = await myToken.read.protocolURI();
    assert.equal(uri, "https://pox.me");
  })
});