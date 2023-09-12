const hre = require("hardhat");

async function main() {
    // Deploy contract here
    // Define the arguments for your constructor
    const vrfCoordinatorV2 = "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625";
    const subscriptionId = 5100;
    const gasLane = "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c";
    const Interval = 30;
    const entranceFee = ethers.parseEther("0.01");
    const callbackGasLimit = 500000;

    const RaffleFactory = await hre.ethers.getContractFactory("Raffle");
    const Raffle = await RaffleFactory.deploy(
        vrfCoordinatorV2,
        subscriptionId,
        gasLane,
        Interval,
        entranceFee,
        callbackGasLimit
    );

    console.log("deploying wait Raffle Contract !!!!");

    console.log(Raffle.target);
    await Raffle.waitForDeployment();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
