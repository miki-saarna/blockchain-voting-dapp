// Add these lines at the top where you have other imports
import React, { useState, useEffect } from 'react';
import Header from './header/index';
import Footer from './footer/index';
import Intro from './intro/index';
import Voting from './voting/index'
import { getProvider, getSigner, getContract} from './utils/blockchainInteractions';

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [voteCount, setVoteCount] = useState({});
  const [winner, setWinner] = useState([]);

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

  useEffect(() => {
    connectWallet();
    // fetchCandidates();
    // Optional: Listen for account changes
    window.ethereum.on('accountsChanged', () => connectWallet());
  }, []);

  const fetchCandidates = async () => {
    const provider = getProvider();
    const contract = getContract(provider);
    const candidatesLength = await contract.candidates.length; // Must create this func in smart contract
    console.log(candidatesLength)
    let candidatesList = [];
    for (let i = 0; i < candidatesLength; i++) {
      const candidate = await contract.candidates(i);
      candidatesList.push(candidate);
    }
    setCandidates(candidatesList);
    console.log(candidates)
  };

  const endPoll = async () => {
    const signer = await getSigner();
    const contract = getContract(signer);
    await contract.endPoll();
  };

  // // something wrong with this func
  async function getCandidatesList() {
    const provider = getProvider()
    const contract = getContract(provider)
    const candidates = await contract.candidates()
    console.log("candidates", candidates)
    return candidates;
  }

  

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <Intro />
      <button className="border border-gray-400 px-2 py-1 rounded" onClick={connectWallet}>Connect to MetaMask</button>
      <p>Your account: {userAccount}</p>
      <Voting
        candidates={candidates}
      />
      <button className="border border-gray-400 px-2 py-1 rounded ml-2" onClick={fetchCandidates}>Get list of candidates</button>
      <Footer />
    </div>
  );
}

export default App;
