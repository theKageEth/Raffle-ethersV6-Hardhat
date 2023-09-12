const {ethers} = require("hardhat");

module.exports = [
    "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625", // vrfCoordinatorV2 (address)
    5100, // subscriptionId (uint64)
    "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // gasLane (bytes32)
    30, // Interval (uint256)
    ethers.parseEther("0.01"), // entranceFee (uint256, converted from Ether)
    500000, // callbackGasLimit (uint32)
];
