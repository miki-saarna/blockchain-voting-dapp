import { useState, useEffect } from 'react';
import Button from '../components/button';

export default function MetaMaskInteractions() {
  const [userAccount, setUserAccount] = useState(null);

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
    try {
      // Optional: Listen for account changes
      window.ethereum.on('accountsChanged', () => connectWallet());
    } catch (err) {
      console.log("Error: ", err);
    }
  }, []);

  return (
    <div className="max-w-2xl lg:max-w-6xl flex flex-col mx-auto w-full mt-6 px-6 lg:px-12">
      <div className="border border-sage-dark rounded-md overflow-hidden">
        <div className="p-3 text-lg font-bold bg-teal border-b border-sage-dark">MetaMask</div>
        <div className="p-3">
          {userAccount
            ? <p className="text-xs"><span className="font-bold">MetaMask account:</span> {userAccount}</p>
            : <Button onClick={connectWallet} className="w-fit bg-zest border border-sage-dark font-bold">
              Connect to MetaMask
            </Button>
          }
        </div>
      </div>
    </div>
  )
}