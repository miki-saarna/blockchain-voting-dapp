import { JSX } from 'react';

export default function Intro(): JSX.Element {
  return (
    <div className="max-w-2xl lg:max-w-6xl mx-auto w-full flex flex-col px-6 lg:px-12 text-xs">
      <p>Explore the future of voting with our Blockchain Voting dApp, a developmental project designed for learning and experimentation in Solidity and smart contract technology. Currently a work in progress with additional features on the way, this platform is perfect for testing and educational purposes and is not intended for official use.</p>
      <p className="mt-3">Developed with: <span className="font-bold">Solidity, TypeScript, React</span></p>
    </div>
  )
}