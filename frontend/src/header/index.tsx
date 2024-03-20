import { JSX } from 'react';

export default function Header(): JSX.Element {
  return (
    <header className="max-w-2xl lg:max-w-6xl p-6 lg:px-12">
      <h1 className="text-2xl lg:text-4xl font-bold">Blockchain Voting dApp</h1>
    </header>
  )
}