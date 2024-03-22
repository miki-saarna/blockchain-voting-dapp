import { JSX, useState, useEffect } from 'react';
import Details from './details';
import Poll from './poll';
import Rewards from './rewards';
import { getProvider, getContract} from '../utils/blockchainInteractions';

export default function Voting(): JSX.Element {

  const [pollStartTime, setPollStartTime] = useState<BigInt | null>(null);
  const [pollEndTime, setPollEndTime] = useState<BigInt | null>(null);
  const [isPollActive, setIsPollActive] = useState<boolean>(false)
  const [checkIfSenderAlreadyVoted, setCheckIfSenderAlreadyVoted] = useState<boolean>(false);

  const fetchPollDetails = async () => {
    const provider = getProvider();
    const contract = getContract(provider);
    const startTime = await contract.pollStartTime();
    const endTime = await contract.pollEndTime();
    setPollStartTime(startTime);
    setPollEndTime(endTime);
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  useEffect(() => {
    setIsPollActive(!!(pollStartTime && !pollEndTime))
  }, [pollStartTime, pollEndTime])

  return (
    <main className="grow max-w-2xl lg:max-w-6xl flex flex-col space-y-6 mx-auto w-full mt-6 px-6 lg:px-12">
      <Details
        isPollActive={isPollActive}
        pollStartTime={pollStartTime}
        pollEndTime={pollEndTime}
        checkIfSenderAlreadyVoted={checkIfSenderAlreadyVoted}
        setCheckIfSenderAlreadyVoted={setCheckIfSenderAlreadyVoted}
      />
      <p className="text-xs"><span className="font-bold">Note:</span> if you encounter any errors, please terminate the poll by clicking on the "End poll" button if it isn't already terminated and refresh the page.</p>
      <Poll
        isPollActive={isPollActive}
        setPollStartTime={setPollStartTime}
        setPollEndTime={setPollEndTime}
        checkIfSenderAlreadyVoted={checkIfSenderAlreadyVoted}
        setCheckIfSenderAlreadyVoted={setCheckIfSenderAlreadyVoted}
      />
      {/* <Rewards /> */}
    </main>
  )
}