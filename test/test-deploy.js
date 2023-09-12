const {time, loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect, assert} = require("chai");
const hre = require("hardhat");

describe("Raffle", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployFundMeFixture() {
        // Contracts are deployed using the first signer/account by default

        const vrfCoordinatorV2 = "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625";
        const subscriptionId = 5100;
        const gasLane = "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c";
        const Interval = 30;
        const entranceFee = ethers.parseEther("0.01");
        const callbackGasLimit = 500000;
        const [owner, otherAccount] = await ethers.getSigners();

        const Raffle = await hre.ethers.getContractFactory("Raffle");
        await Raffle.deploy(vrfCoordinatorV2, subscriptionId, gasLane, Interval, entranceFee, callbackGasLimit);
        return {
            Raffle,
            owner,
            otherAccount,
            vrfCoordinatorV2,
            subscriptionId,
            gasLane,
            Interval,
            entranceFee,
            callbackGasLimit,
        };
    }

    describe("Deployment", function () {
        it("Should set the right constructor", async function () {
            const {Raffle, vrfCoordinatorV2, subscriptionId, gasLane, Interval, entranceFee, callbackGasLimit} =
                await loadFixture(deployFundMeFixture);

            console.log(vrfCoordinatorV2);

            expect(vrfCoordinatorV2.toLocaleLowerCase()).to.equal("0x8103b0a8a00be2ddc778e6e7eaa21791cd364625");
            expect(subscriptionId).to.equal(5100);
            expect(gasLane).to.equal("0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c");
            expect(Interval).to.equal(30);
            expect(entranceFee).to.equal(ethers.parseEther("0.01"));
            expect(callbackGasLimit).to.equal(500000);
            console.log(ethers.formatEther(entranceFee));
        });
    });

    // This is boiler-plate from fundMe contract
    // describe("withdraw", function () {
    //     it("Should transfer the funds to the owner", async function () {
    //         const {FundMe} = await loadFixture(deployFundMeFixture);

    //         // this will throw if the transaction reverts
    //         await FundMe.withdraw();
    //     });

    //     it("Should not transfer to otherAccount", async function () {
    //         const {FundMe, otherAccount, owner} = await loadFixture(deployFundMeFixture);

    //         // We use lock.connect() to send a transaction from another account
    //         await expect(FundMe.connect(otherAccount).withdraw()).to.be.revertedWith("NotOwner");
    //     });
    //     it("updating the balance of Contract", async function () {
    //         const {FundMe, owner} = await loadFixture(deployFundMeFixture);

    //         const startingBalance = await hre.ethers.provider.getBalance(FundMe.target);
    //         console.log(` Contract ${startingBalance}`);

    //         const startingBalanceOwner = await hre.ethers.provider.getBalance(owner.address);
    //         console.log(` owner ${startingBalanceOwner}`);

    //         const payingContract = await FundMe.fund({value: 100});

    //         const fundedBalance = await hre.ethers.provider.getBalance(FundMe.target);
    //         console.log(` Contract ${fundedBalance}`);

    //         await FundMe.withdraw();

    //         const lastContractBalance = await hre.ethers.provider.getBalance(FundMe.target);
    //         console.log(` Contract ${lastContractBalance}`);

    //         expect(startingBalance).to.equal(0);
    //         expect(fundedBalance).to.equal(100);
    //         expect(lastContractBalance).to.equal(0);
    //     });
    // });

    // describe("Fund Function", function () {
    //     it("Should expect funds and revert an error", async function () {
    //         const {FundMe} = await loadFixture(deployFundMeFixture);

    //         await expect(FundMe.fund()).to.be.revertedWith("You need to spend more ETH!");
    //     });
    //     it("Should not revert error if ammount more than 50", async function () {
    //         const {FundMe} = await loadFixture(deployFundMeFixture);

    //         await expect(FundMe.fund({value: 50})).to.be.not.revertedWith("You need to spend more ETH!");
    //     });
    //     it("Should update amount funded", async function () {
    //         const {FundMe, owner} = await loadFixture(deployFundMeFixture);

    //         await FundMe.fund({value: 50});

    //         const response = await FundMe.addressToAmountFunded(owner);

    //         await expect(response).to.equal(50);
    //     });
    //     it("Should add funders to an array", async function () {
    //         const {FundMe, owner} = await loadFixture(deployFundMeFixture);

    //         await FundMe.fund({value: 50});

    //         const response = await FundMe.funders(0);
    //         // console.log(response);
    //         // console.log(owner.address);

    //         await expect(response).to.equal(owner.address);
    //     });
    // });
});
