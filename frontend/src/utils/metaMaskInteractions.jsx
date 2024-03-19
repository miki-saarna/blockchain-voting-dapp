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
    // Optional: Listen for account changes
    window.ethereum.on('accountsChanged', () => connectWallet());
  }, []);

  return (
    <div className="max-w-2xl lg:max-w-6xl flex flex-col space-y-6 p-6 lg:px-12">
      <Button
        onClick={connectWallet}
        color="bg-gray-800"
        className="w-fit font-bold"
      >
        Connect to MetaMask
      </Button>
      <p className="text-xs"><span className="font-bold">MetaMask account:</span> {userAccount}</p>
    </div>
  )
}