import { JSX } from 'react';
import LoadingSpinner from '../components/loadingSpinner'

export default function LoadingOverlay(): JSX.Element {
  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black/50 select-none">
      <LoadingSpinner />
      <span className="ml-2 text-white animate-pulse">Processing...</span>
    </div>
  )
}