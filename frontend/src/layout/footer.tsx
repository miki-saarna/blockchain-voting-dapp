import { JSX } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

export default function Header(): JSX.Element {
  return (
    <footer className="max-w-2xl lg:max-w-6xl mx-auto w-full py-12 px-6 lg:px-12">
      <a
        href="https://github.com/miki-saarna/blockchain-voting-dapp"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-sm text-blue-500 underline"
      >
        <span>View source code</span>
        <ArrowTopRightOnSquareIcon className="ml-1 w-4 h-4" />
      </a>
    </footer>
  )
}