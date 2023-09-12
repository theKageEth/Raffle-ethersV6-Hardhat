Raffle contract that uses chainlink VRF and upkeep.

I followed Patrick Collins and did some changes to how contract been deployed.

replace Api Keys with your own.

Use these commands

```script
npx hardhat run --network sepolia scripts/deploy.js
// note the contract address and then verify it. Make sure u check arguments.js file

npx hardhat verify --constructor-args arguments.js <contract address> --network sepolia

```
