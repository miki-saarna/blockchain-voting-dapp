import { useState, useEffect } from 'react';
import Button from '../components/button';

export default function MetaMaskInteractions({ isWalletConnected, setIsWalletConnected }) {
  const [userAccount, setUserAccount] = useState(null);
  const [hasMetaMask, setHasMetaMask] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
    } else {
      console.log('Please install MetaMask!');
    }
  }); // []

  useEffect(() => {
    try {
      connectWallet();
      // Optional: Listen for account changes
      window.ethereum.on('accountsChanged', () => connectWallet());
    } catch (err) {
      console.log("Error: ", err);
    }
  }, []);

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsWalletConnected(true)
        setUserAccount(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  }


  return (
    <div className="max-w-2xl lg:max-w-6xl flex flex-col mx-auto w-full mt-6 px-6 lg:px-12">
      <div className="bg-white border border-sage-dark rounded-md overflow-hidden">
        <div className="p-3 text-lg font-bold bg-teal border-b border-sage-dark">MetaMask</div>
        <div className="p-3">

          {hasMetaMask
            ? isWalletConnected
              ? <p className="text-xs"><span className="font-bold">MetaMask account:</span> {userAccount}</p>
              : (
                <>
                  <Button onClick={connectWallet} className="w-fit bg-zest border border-sage-dark font-bold">
                    Connect to MetaMask
                  </Button>
                  <div className="mt-2 text-sm">Connecting to MetaMask is required to interact with this app.</div>
                </>
              )
            : <div className="text-sm">Please install <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 underline" >MetaMask</a></div>
          }
        </div>
      </div>
    </div>
  )
}