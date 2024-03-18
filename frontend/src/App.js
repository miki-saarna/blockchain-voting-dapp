// Add these lines at the top where you have other imports
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import voteContractABI from './DeployVoteABI.json';
import Test from './test/index'

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [pollStartTime, setPollStartTime] = useState(null);
  const [pollEndTime, setPollEndTime] = useState(null);

  // Connect to Metamask
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  }

  function getProvider() {
    const rpcUrl = process.env.REACT_APP_RPC_URL;
    return new ethers.JsonRpcProvider(rpcUrl); // ethers.getDefaultProvider(rpcUrl)
  }

  function getSigner() {
    const provider = getProvider();
    const PRIVATE_KEY  = process.env.REACT_APP_PRIVATE_KEY;
    const signer = new ethers.Wallet(PRIVATE_KEY, provider)
    return signer
  }

  function getContract(providerOrSigner) {
    const voteContractAddress = process.env.REACT_APP_VOTE_CONTRACT_ADDRESS;
    return new ethers.Contract(voteContractAddress, voteContractABI, providerOrSigner);
  }

  // check on render:
  useEffect(() => {
    const fetchDataFromContract = async () => {
      try {
        const signer = getSigner()
        const contract = getContract(signer)
        const startTime = await contract.pollStartTime()
        setPollStartTime(startTime.toString());
      } catch (err) {
        console.error(err);
      }
    }
    fetchDataFromContract()
  }, [])

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

  async function getMaxBonusAmount() {
    const provider = getProvider()
    const contract = getContract(provider)
    const amount = await contract.voteRewardBonusMaxAmount()
    console.log("amount", amount)
    return amount;
  }

  // something wrong with this func
  async function getCandidatesList() {
    const provider = getProvider()
    const contract = getContract(provider)
    const candidates = await contract.candidates()
    console.log("candidates", candidates)
    return candidates;
  }

  async function beginPoll() {
    const signer = getSigner()
    const contract = getContract(signer)

    const exampleCandidates = ["jack", 'henz', 'lemon']
    const tx = await contract.beginPoll(exampleCandidates)
    console.log("tx", tx)
    await tx.wait()
    console.log('tx mined')
    const startTime = await contract.pollStartTime()
    setPollStartTime(startTime.toString());
  }

  async function vote(candidateIdx) {
    const signer = getSigner()
    const contract = getContract(signer)
    const tx = await contract.castVote(candidateIdx)
    console.log("tx", tx)
    await tx.wait()
    console.log('tx mined')
  }

  return (
    <div className="App">
      <header className="App-header">
        <Test
          pollStartTime={pollStartTime}
          pollEndTime={pollEndTime}
        />

        <p>Your account: {userAccount}</p>
        <button onClick={connectWallet}>Connect to MetaMask</button>
        <button onClick={getMaxBonusAmount}>Get max bonus amount</button>
        <button onClick={beginPoll}>Begin poll</button>
        <button onClick={getCandidatesList}>Get list of candidates</button>
        <button onClick={() => vote(1)}>Vote for 2nd candidate</button>
        {/* <button onClick={() => setCandidates(getCandidatesList())}>Set list of candidates</button> */}

        {/* {candidates.map((candidate) => <div>{candidate}</div>)} */}
      </header>
    </div>
  );
}

export default App;
