import { JSX } from 'react';

export default function Intro(): JSX.Element {
  return (
    <div className="max-w-2xl lg:max-w-6xl flex flex-col p-6 lg:px-12">
      <div className="text-xs">
        Intro component: this component gives detailed info regarding this app.
      </div>
    </div>
  )
}