import { JSX, useState, useEffect } from 'react';
import Details from './details';
import Poll from './poll';
import Rewards from './rewards';
import { getProvider, getSigner, getContract} from '../utils/blockchainInteractions';

export default function Voting(): JSX.Element {

  const [pollStartTime, setPollStartTime] = useState<BigInt | null>(null);
  const [pollEndTime, setPollEndTime] = useState<BigInt | null>(null);
  const [checkIfSenderAlreadyVoted, setCheckIfSenderAlreadyVoted] = useState(false);

  const fetchPollDetails = async () => {
    const provider = getProvider();
    const contract = getContract(provider);
    const startTime = await contract.pollStartTime();
    const endTime = await contract.pollEndTime();
    setPollStartTime(startTime);
    setPollEndTime(endTime);
  };

  // function convertBigIntToDate(bigInt: BigInt): Date | null {
  //   const timestamp = Number(bigInt);
  //   if (!timestamp) return null
  //   const date = new Date(timestamp * 1000);
  //   return date
  // }

  useEffect(() => {
    fetchPollDetails();
  }, []);


  return (
    <main className="grow max-w-2xl lg:max-w-6xl flex flex-col space-y-6 mx-auto w-full mt-6 px-6 lg:px-12">
      <Details
        pollStartTime={pollStartTime}
        pollEndTime={pollEndTime}
        checkIfSenderAlreadyVoted={checkIfSenderAlreadyVoted}
        setCheckIfSenderAlreadyVoted={setCheckIfSenderAlreadyVoted}
      />
      <Poll
        setPollStartTime={setPollStartTime}
        setPollEndTime={setPollEndTime}
        setCheckIfSenderAlreadyVoted={setCheckIfSenderAlreadyVoted}
      />
      <Rewards />
    </main>
  )
}