const hre = require("hardhat");
const { ProviderWrapper } = require("hardhat/plugins");

async function main() {
  // Deploy contract here
  const FundMeFactory = await hre.ethers.deployContract("FundMe");
  console.log("deploying wait FundMe Contract !!!!");
  const FundMe = await FundMeFactory.waitForDeployment();

  console.log(FundMe.target);
  console.log(FundMe.i_owner);
  console.log();

  //get the address here

  // console.log("FundMe Contract deployed to:", FundMe.target);
  // console.log("i_owner:", deployer.target);
  // console.log("priceFeed:", ethUsdPriceFeed);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
