import { JSX, useState } from 'react';
import { getProvider, getSigner, getContract} from '../utils/blockchainInteractions';

export default function Poll(): JSX.Element {
  const [pollStartTime, setPollStartTime] = useState<number>(0);
  const [pollEndTime, setPollEndTime] = useState<number>(0);

  async function beginPoll() {
    const signer = getSigner()
    const contract = getContract(signer)

    const exampleCandidates = ["jack", 'henz', 'lemon']

    const tx = await contract.beginPoll(exampleCandidates)
    console.log("tx", tx)
    await tx.wait()
    console.log('tx mined')
    const startTime = await contract.pollStartTime();
    setPollStartTime(startTime.toString());
    setPollEndTime(0);
  }

  const endPoll = async () => {
    const signer = await getSigner();
    const contract = getContract(signer);
    await contract.endPoll();
  };

  async function castVote(candidateIdx: number) {
    const signer = getSigner()
    const contract = getContract(signer)
    const tx = await contract.castVote(candidateIdx)
    console.log("tx", tx)
    await tx.wait()
    console.log('tx mined')
  }

  return (
    <div className="p-3 border border-red-300 rounded-md">
      Poll component
      <button className="border border-gray-400 px-2 py-1 rounded ml-2" onClick={beginPoll}>Begin poll</button>
      <button className="border border-gray-400 px-2 py-1 rounded ml-2" onClick={() => castVote(1)}>Vote for 2nd candidate</button>
    </div>
  )
}