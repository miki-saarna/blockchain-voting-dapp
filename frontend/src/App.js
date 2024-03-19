// Add these lines at the top where you have other imports
import React, { useState, useEffect } from 'react';
import PollDetails from './details/pollDetails'
import { getProvider, getSigner, getContract} from './utils/blockchainInteractions';

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [pollStartTime, setPollStartTime] = useState(null);
  const [pollEndTime, setPollEndTime] = useState(null);
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
    fetchPollDetails();
    fetchCandidates();
    // Optional: Listen for account changes
    window.ethereum.on('accountsChanged', () => connectWallet());
  }, []);

  const fetchPollDetails = async () => {
    const provider = getProvider();
    const contract = getContract(provider);
    const startTime = await contract.pollStartTime();
    const endTime = await contract.pollEndTime();
    setPollStartTime(startTime.toString());
    setPollEndTime(endTime.toString());
  };

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

  async function beginPoll() {
    const signer = getSigner()
    const contract = getContract(signer)

    const exampleCandidates = ["jack", 'henz', 'lemon']

    const tx = await contract.beginPoll(exampleCandidates)
    console.log("tx", tx)
    await tx.wait()
    console.log('tx mined')
    const startTime = await contract.pollStartTime();
    setPollStartTime(startTime.toString());
    setPollEndTime(0);
  }

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

  async function castVote(candidateIdx) {
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
        <PollDetails
          pollStartTime={pollStartTime}
          pollEndTime={pollEndTime}
          candidates={candidates}
        />

        <p>Your account: {userAccount}</p>
        <button className="border border-gray-400 px-2 py-1 rounded" onClick={connectWallet}>Connect to MetaMask</button>
        <button className="border border-gray-400 px-2 py-1 rounded ml-2" onClick={beginPoll}>Begin poll</button>
        <button className="border border-gray-400 px-2 py-1 rounded ml-2" onClick={fetchCandidates}>Get list of candidates</button>
        <button className="border border-gray-400 px-2 py-1 rounded ml-2" onClick={() => castVote(1)}>Vote for 2nd candidate</button>
      </header>
    </div>
  );
}

export default App;
