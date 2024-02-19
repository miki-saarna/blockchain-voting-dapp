Voting Smart Contract

## Notes
- added functionality to incentivize voting; incentive exponentially increases as more people vote

## Commands

### Compile
`forge build`

### Local node
`anvil` or `npx hardhat node`

if using hardhat, run these commands:
- `npx install --save-dev hardhat`
- `npx hardhat init`
- `npx hardhat node`

### Deploy contract
`forge create <contract-name> --rpc-url <rpc-url> --private-key <private-key>`
- doesn't seem to work with `vm.startBroadcast` and `vm.stopBroadcast`

`forge script script/DeployVote.s.sol:DeployVote --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast`
- add `--broadcast`. Without -> simulation

<!-- Contract address -->
<!-- 0x5fbdb2315678afecb367f032d93f642f64180aa3 -->

`cast call 0x5fbdb2315678afecb367f032d93f642f64180aa3 'checkIfSenderAlreadyVoted()' --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

<!--
cast call 0x5FbDB2315678afecb367f032d93F642f64180aa3 'greeting()' --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
-->
0x5FbDB2315678afecb367f032d93F642f64180aa3
0x5242d4ac717cdf38c36af290f2b0da99aa82c67

<!-- <token>.balanceOf(<address>) -->

`echo $ENVIRONMENT_VARIABLE=<value>`