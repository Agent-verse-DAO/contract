const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");

describe("CustomNFT", function () {
  let CustomNFT, customNFT, owner, addr1;
  const CREATION_FEE = ethers.utils.parseEther("0.001");

  beforeEach(async () => {
    CustomNFT = await ethers.getContractFactory("CustomNFT");
    [owner, addr1] = await ethers.getSigners();
    customNFT = await CustomNFT.deploy();
  });

  describe("Deployment", () => {
    it("Should set the correct owner", async () => {
      expect(await customNFT.creator()).to.equal(owner.address);
    });

    it("Should have zero balance initially", async () => {
      let balance = await ethers.provider.getBalance(customNFT.address);
      expect(balance).to.equal(0);
    });
  });

  describe("createNFT function", () => {
    it("Should create an NFT if called by the owner and sufficient fee is sent", async () => {
      const tx = await customNFT.createNFT("tokenURI", { value: CREATION_FEE });
      await tx.wait();

      expect(await customNFT.hasMinted()).to.equal(true);
      
      const event = (await customNFT.queryFilter("NFTCreated"))[0];
      expect(event.args.creator).to.equal(owner.address);
    });

    it("Should fail if not enough fee is sent", async () => {
      await expect(customNFT.createNFT("tokenURI", { value: 0 })).to.be.revertedWith(
        "Not enough ETH sent; check the creation fee"
      );
    });

    it("Should fail if called by someone other than the owner", async () => {
      await expect(customNFT.connect(addr1).createNFT("tokenURI", { value: CREATION_FEE })).to.be.revertedWith(
        "Only the creator of the contract can mint"
      );
    });

    it("Should fail if NFT is already minted", async () => {
      const tx = await customNFT.createNFT("tokenURI", { value: CREATION_FEE });
      await tx.wait();

      await expect(customNFT.createNFT("tokenURI", { value: CREATION_FEE })).to.be.revertedWith(
        "The creator has already minted the NFT"
      );
    });
  });

  describe("withdraw function", () => {
    it("Should be able to withdraw by owner", async () => {
      await customNFT.createNFT("tokenURI", { value: CREATION_FEE });
      await customNFT.withdraw();

      let balance = await ethers.provider.getBalance(customNFT.address);
      expect(balance).to.equal(0);
    });

    it("Should not be able to withdraw by other address", async () => {
      await customNFT.createNFT("tokenURI", { value: CREATION_FEE });
      await expect(customNFT.connect(addr1).withdraw()).to.be.revertedWith(
        "You are not the creator of the contract"
      );
    });
  });
});
