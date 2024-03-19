import { ethers } from 'ethers';
import voteContractABI from './DeployVoteABI.json';

export const getProvider = () => new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
export const getSigner = () => new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, getProvider());
export const getContract = (providerOrSigner) => new ethers.Contract(process.env.REACT_APP_VOTE_CONTRACT_ADDRESS, voteContractABI, providerOrSigner);

// function getProvider() {
//   const rpcUrl = process.env.REACT_APP_RPC_URL;
//   return new ethers.JsonRpcProvider(rpcUrl);
//   // alternative options:
//   // ethers.getDefaultProvider(rpcUrl)
//   // new ethers.Web3Provider(window.ethereum)
// }

// function getSigner() {
//   const provider = getProvider();
//   const PRIVATE_KEY  = process.env.REACT_APP_PRIVATE_KEY;
//   const signer = new ethers.Wallet(PRIVATE_KEY, provider)
//   return signer
// }

// function getContract(providerOrSigner) {
//   const voteContractAddress = process.env.REACT_APP_VOTE_CONTRACT_ADDRESS;
//   return new ethers.Contract(voteContractAddress, voteContractABI, providerOrSigner);
// }



// async function getProviderOrSigner(needSigner = false) {
  //   // const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const provider = new ethers.JsonRpcProvider(rpcUrl); // ethers.getDefaultProvider(rpcUrl)
  //   const { chainId } = await provider.getNetwork();
  //   if (chainId !== 11155111n) {
  //     console.error('Please connect to the Sepolia testnet');
  //     return;
  //   }
  //   if (needSigner) {
  //     console.log("provider.getSigner: ", provider.getSigner)
  //     const signer = await provider.getSigner();
  //     console.log(signer)
  //     return signer;
  //   }
  //   return provider;
  // }