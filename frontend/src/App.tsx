import { JSX, useState, useEffect } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import Description from './layout/description';
import Voting from './voting/index'
import MetaMaskInteractions from './utils/metaMaskInteractions';

function App(): JSX.Element {
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  useEffect(() => {
    document.documentElement.style.background = '#fff8f0';
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full text-sage-dark">
      <Header />
      <Description />
      <MetaMaskInteractions isWalletConnected={isWalletConnected} setIsWalletConnected={setIsWalletConnected} />
      <Voting isWalletConnected={isWalletConnected} />
      <Footer />
    </div>
  );
}

export default App;
