import { JSX, useEffect } from 'react';
import Header from './header/index';
import Footer from './footer/index';
import Intro from './intro/index';
import Voting from './voting/index'
import MetaMaskInteractions from './utils/metaMaskInteractions';

function App(): JSX.Element {

  useEffect(() => {
    document.documentElement.style.background = '#fff8f0';
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full text-sage-dark">
      <Header />
      <Intro />
      <MetaMaskInteractions />
      <Voting />
      <Footer />
    </div>
  );
}

export default App;
