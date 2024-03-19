// Add these lines at the top where you have other imports
import Header from './header/index';
import Footer from './footer/index';
import Intro from './intro/index';
import Voting from './voting/index'
import MetaMaskInteractions from './utils/metaMaskInteractions';

function App() {

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
