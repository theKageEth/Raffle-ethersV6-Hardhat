const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");
const hre = require("hardhat");

describe("FundMe", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFundMeFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const FundMe = await hre.ethers.deployContract("FundMe");
    await FundMe.waitForDeployment();

    return { FundMe, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { FundMe, owner } = await loadFixture(deployFundMeFixture);

      // `expect` receives a value and wraps it in an assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner.
      // console.log(FundMe.i_owner);
      expect(await FundMe.i_owner.target).to.equal(owner.target);
    });
  });

  describe("withdraw", function () {
    it("Should transfer the funds to the owner", async function () {
      const { FundMe } = await loadFixture(deployFundMeFixture);

      // this will throw if the transaction reverts
      await FundMe.withdraw();
    });

    it("Should not transfer to otherAccount", async function () {
      const { FundMe, otherAccount, owner } = await loadFixture(deployFundMeFixture);

      // We use lock.connect() to send a transaction from another account
      await expect(FundMe.connect(otherAccount).withdraw()).to.be.revertedWith("NotOwner");
    });
    it("updating the balance of Contract", async function () {
      const { FundMe, owner } = await loadFixture(deployFundMeFixture);

      const startingBalance = await hre.ethers.provider.getBalance(FundMe.target);
      console.log(` Contract ${startingBalance}`);

      const startingBalanceOwner = await hre.ethers.provider.getBalance(owner.address);
      console.log(` owner ${startingBalanceOwner}`);

      const payingContract = await FundMe.fund({ value: 100 });

      const fundedBalance = await hre.ethers.provider.getBalance(FundMe.target);
      console.log(` Contract ${fundedBalance}`);

      await FundMe.withdraw();

      const lastContractBalance = await hre.ethers.provider.getBalance(FundMe.target);
      console.log(` Contract ${lastContractBalance}`);

      expect(startingBalance).to.equal(0);
      expect(fundedBalance).to.equal(100);
      expect(lastContractBalance).to.equal(0);
    });
  });

  describe("Fund Function", function () {
    it("Should expect funds and revert an error", async function () {
      const { FundMe } = await loadFixture(deployFundMeFixture);

      await expect(FundMe.fund()).to.be.revertedWith("You need to spend more ETH!");
    });
    it("Should not revert error if ammount more than 50", async function () {
      const { FundMe } = await loadFixture(deployFundMeFixture);

      await expect(FundMe.fund({ value: 50 })).to.be.not.revertedWith("You need to spend more ETH!");
    });
    it("Should update amount funded", async function () {
      const { FundMe, owner } = await loadFixture(deployFundMeFixture);

      await FundMe.fund({ value: 50 });

      const response = await FundMe.addressToAmountFunded(owner);

      await expect(response).to.equal(50);
    });
    it("Should add funders to an array", async function () {
      const { FundMe, owner } = await loadFixture(deployFundMeFixture);

      await FundMe.fund({ value: 50 });

      const response = await FundMe.funders(0);
      // console.log(response);
      // console.log(owner.address);

      await expect(response).to.equal(owner.address);
    });
  });
});
