import { JSX } from 'react';

export default function Header(): JSX.Element {
  return (
    <footer className="max-w-2xl lg:max-w-6xl py-12 px-6 lg:px-12">
      <a
        href="https://github.com/miki-saarna/blockchain-voting-dapp"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 underline"
      >
        View source code
      </a>
    </footer>
  )
}