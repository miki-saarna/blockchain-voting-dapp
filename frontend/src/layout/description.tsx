import { JSX } from 'react';

export default function Description(): JSX.Element {
  return (
    <div className="max-w-2xl lg:max-w-6xl mx-auto w-full flex flex-col px-6 lg:px-12 text-xs">
      <p>Explore the future of voting with our Blockchain Voting dApp, a developmental project designed for learning and experimentation in Solidity and smart contract technology. Currently a work in progress with additional features on the way, this smart contract is deployed on <span className="font-bold">Sepolia testnet</span> and is perfect for testing and educational purposes and is not intended for official use.</p>
      <p className="mt-3">Developed with: <span className="font-bold">Solidity, TypeScript, React, Tailwind</span></p>
      <p className="mt-3"><span className="font-bold">Note:</span> page errors may occur while using this app. My next development priority is improving smart contract error handling. Please refresh the page if you encounter any errors until this issue is resolved.</p>
    </div>
  )
}