# Blockchain Voting Smart Contract dApp

Welcome to the Blockchain Voting Smart Contract dApp! This project is designed for educational and learning purposes, exploring the possibilities of decentralized voting systems using blockchain technology.

You can interact with this smart contract [here](https://voting-dapp-ashy.vercel.app)!

Visit the smart contract's etherscan.sepolia page [here](https://sepolia.etherscan.io/address/0x7495e254B084193aacD03Cdd9e5A2e1E0B55422a).

You can also import the following Gist ID into Remix: 44065bd0829da53415ed96732502d3b2

## Overview

Explore the future of voting with our Blockchain Voting dApp, a developmental project designed for learning and experimentation in Solidity and smart contract technology. Currently a work in progress with additional features on the way, this smart contract is deployed on Sepolia testnet and is perfect for testing and educational purposes and is not intended for official use.

## In development

As this project is still in development, page errors may occur during app usage. Improving smart contract error handling is the current highest priority to ensure smooth and efficient usage of this app. If errors occur, try refreshing the page and disconnecting and reconnecting MetaMask.

## Features

- **Decentralized Voting:** Utilize the power of blockchain technology for secure and transparent voting processes.
- **Testnet Deployment:** The smart contract is deployed on Sepolia testnet, providing a sandbox environment for experimentation.
- **Educational Purpose:** This project aims to provide insights into Solidity and smart contract development, perfect for educational purposes.
- **Continuous Improvement:** Stay tuned for updates and improvements as we continue to enhance the functionality and usability of the dApp.

## Technologies Used

- **Solidity**
- **Ethers.js**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Sepolia Testnet**

## Usage

1. Clone the repository.
2. Within a terminal window, navigate to the root directory and install dependencies with `npm install`.
3. Navigate to the frontend directory and install dependencies with `npm install`.
4. Follow the local or sepolia deployment instructions below.

### Instructions for deploying smart contract locally:

1. Open a terminal window and navigate to the root directory of this project. Build the app using the command `forge build`.
2. Within the same terminal window, start a local blockchain node using the command `anvil`.
3. In your smart contract's `.env` file (the `.env` file located within the root directory and not the frontend directory), provide the correct values for `RPC_URL` and `PRIVATE_KEY_1`, which can both be found from reading the printed content from running the `anvil` command in the previous step (Note: choose any of the 10 private keys provided).
4. Open a new terminal window, navigate to the root directory of this app and run `source .env` to register the new environment variables.
5. Within the newly opened terminal window, deploy your contract locally by running `make forge-script`. Alternatively, you can spell out the entire command: `forge script script/DeployVote.s.sol:DeployVote --rpc-url $RPC_URL --private-key $PRIVATE_KEY_1 --broadcast`. This will deploy your smart contract locally to the `RPC_URL` provided.
6. Navigate to the `.env` file located within the frontend directory and assign the correct values of `PRIVATE_KEY_1` and `RPC_URL` that were used to deploy the smart contract. Also assign `REACT_APP_VOTE_CONTRACT_ADDRESS` to the address of the smart contract that was printed from the previous step (Note: the contract address will be the last transaction within block 2 printed from the previous step). Run `source .env` to register the new environment variables.
7. Copy the contract's ABI, which was created from running `forge build` and can be found within `./out/Vote.sol/Vote.json`. Only copy the value from the properly "abi" (the value should be an array of objects). Paste the ABI into `./frontend/src/utils/DeployVoteABI.json`.
8. Within a new terminal window, navigate to the frontend directory and start the development server by running `npm run start`.
9. Access and interact with the deployed smart contract through the local frontend server.

---

### Instructions for deploying smart contract to Sepolia Testnet:

1. Open a terminal window and navigate to the root directory of this project. Build the app using the command `forge build`.
2. In your smart contract's `.env` file (the `.env` file located within the root directory and not the frontend directory), provide the correct values for `SEPOLIA_RPC_URL` and `PRIVATE_KEY_1` (use a disposable wallet's private key for testing purposes). Optionally, you can input your `ETHERSCAN_API_KEY`. Run `source .env` to register the new environment variables.
3. Deploy your contract to Sepolia Testnet by running `make forge-script-sepolia`. Alternatively, you can spell out the entire command: `forge script script/DeployVote.s.sol:DeployVote --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY_1 --broadcast --verify`. This will deploy your smart contract. Copy the contract address and verify it on [etherscan.sepolia.](https://sepolia.etherscan.io) to ensure the deployment was successful.
4. Within the contract's etherscan.sepolia URL, navigate to the Contract tab and scroll down until you find the Contract ABI. Copy the ABI and paste it into `./frontend/src/utils/`.
5. In your frontend's `.env` file, assign the value of `PRIVATE_KEY_1` to `REACT_APP_PRIVATE_KEY`, `SEPOLIA_RPC_URL` to `REACT_APP_RPC_URL`, and the vote contract's address to `REACT_APP_VOTE_CONTRACT_ADDRESS`.
6. Navigate to the `.env` file located within the frontend directory and assign `REACT_APP_VOTE_CONTRACT_ADDRESS` to the address of the deployed smart contract. Run `source .env` to register the new environment variable.
7. Start the development server by running `npm run start`.
8. Access and interact with the deployed smart contract through the local frontend server.

---

### Instructions for deploying frontend to Sepolia Testnet:

1. Within a new terminal window, navigate to the frontend directory of the project and run `vercel`. Follow the steps prompted by Vercel and ensure successful deployment to Vercel
2. Navigate to your new Vercel project and add a new environment variable: set `REACT_APP_VOTE_CONTRACT_ADDRESS` equal to the smart contract's address
3. Trigger a redeploy.
4. After successful redeployment, access the application through the provided Vercel URL to view and interact with the smart contract.

## Disclaimer

This dApp is intended for testing and educational purposes only. Do not use it for official voting purposes.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
