import { JSX } from 'react';
import { UsersIcon } from '@heroicons/react/24/solid'

export default function Header(): JSX.Element {
  return (
    <div className="max-w-2xl lg:max-w-6xl mx-auto w-full p-6 lg:px-12 flex items-center">
      <h1 className="text-2xl lg:text-4xl font-bold">Blockchain Voting dApp</h1>
      <UsersIcon className="ml-2 w-7 h-7" />
    </div>
  )
}