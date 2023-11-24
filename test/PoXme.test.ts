import hre from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { ethers } from "ethers";
import { Address$Type } from "../artifacts/@openzeppelin/contracts/utils/Address.sol/Address";

// A deployment function to set up the initial state
const deploy = async () => {
  const myToken = await hre.viem.deployContract("PoXme");

  return { myToken };
};

describe("MyToken Contract Tests", function () {
  it("should deploy the contract and initialize it", async function () {
    // get the deployment accounts using ethers
    const [ownerWallet] = await hre.viem.getWalletClients();

    // Load the contract instance using the deployment function
    const { myToken } = await loadFixture(deploy);

    const deployer = await myToken.read.owner();

    console.log(deployer)
    console.log(ownerWallet.account.address)

    // Get the initial supply
    const totalSupply = await myToken.read.totalSupply();

    const initialize = await myToken.write.initialize(
      [ownerWallet.account.address]
    );

    // Assert that the supply increased as expected
    assert.equal(totalSupply, BigInt("0"));
  });
});