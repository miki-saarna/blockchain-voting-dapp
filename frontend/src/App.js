// Add these lines at the top where you have other imports
import React, { useState, useEffect } from 'react';
import Header from './header/index';
import Footer from './footer/index';
import Intro from './intro/index';
import Voting from './voting/index'
import MetaMaskInteractions from './utils/metaMaskInteractions';
import { getProvider, getSigner, getContract} from './utils/blockchainInteractions';

function App() {
  const [userAccount, setUserAccount] = useState(null);
  // const [voteCount, setVoteCount] = useState({});
  // const [winner, setWinner] = useState([]);

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
    // Optional: Listen for account changes
    window.ethereum.on('accountsChanged', () => connectWallet());
  }, []);

  

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <Intro />
      <MetaMaskInteractions />
      <Voting />
      <Footer />
    </div>
  );
}

export default App;
