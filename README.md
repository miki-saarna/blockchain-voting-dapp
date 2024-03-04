# Voting Smart Contract

## Contract notes
- Added functionality to incentivize voting - incentive reward amount exponentially increases as more people vote

## Documentation notes
- Although Hardhat is a viable alternative, the following documentation assumes usage of Foundry's test suite

## Commands

### Compile
`forge build`

### Local node
1. `anvil`

2. `npx hardhat node`

if using hardhat, run these prerequisite commands:
- `npx install --save-dev hardhat`
- `npx hardhat init`

### Deploy contract

`forge script script/<DeploymentContract>.s.sol:<DeploymentContractFunction> --rpc-url <rpc-url> --private-key <private-key> --broadcast`
- suffixed `--broadcast` to broadcast transactions to the blockchain

### Cast

- `cast call <contract-address> '<function-name>()' --rpc-url <rpc-url> --private-key <private-key>`
- `cast send <contract-address> '<function-name>()' --rpc-url <rpc-url> --private-key <private-key>`

### Makefile

Create custom commands within makefile implementing environment variables within .env file as a shortcut for long commands
- `make <makefile-cmd>`
- `make <makefile-cmd> <ARGUMENT_NAME=value>`

### Other

Assign environment variable to a value
- `echo $<ENVIRONMENT-VARIABLE>=<value>`

`forge create` vs. `forge script`
- `forge create` - simple, single-contract deployments
    - `forge create <ContractName> --rpc-url <rpc-url> --private-key <private-key>`
- `forge script` - complex, multi-contract deployments, init steps, or configurations
    - `forge script script/<DeploymentContract>.s.sol:<DeploymentContractFunction> --rpc-url <rpc-url> --private-key <private-key> --broadcast`

### Future features

- `emit` where necessary
- explore how to pass in candidates through deployment script with `--sig run(...)`
