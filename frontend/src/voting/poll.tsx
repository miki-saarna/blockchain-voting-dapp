import { JSX, useState, useEffect } from 'react';
import { getProvider, getSigner, getContract} from '../utils/blockchainInteractions';

export default function Poll(): JSX.Element {
  const [pollStartTime, setPollStartTime] = useState<number>(0);
  const [pollEndTime, setPollEndTime] = useState<number>(0);
  const [candidates, setCandidates] = useState<any[]>([]);

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

  const fetchCandidates = async () => {
    const provider = getProvider();
    const contract = getContract(provider);
    const candidatesLength = await contract.candidates.length; // Must create this func in smart contract
    console.log(candidatesLength)
    let candidatesList = [];
    for (let i = 0; i < candidatesLength; i++) {
      const candidate = await contract.candidates(i);
      candidatesList.push(candidate);
    }
    setCandidates(candidatesList);
    console.log(candidates)
  };

  // async function getCandidatesList() {
  //   const provider = getProvider()
  //   const contract = getContract(provider)
  //   const candidates = await contract.candidates()
  //   console.log("candidates", candidates)
  //   return candidates;
  // }

  async function castVote(candidateIdx: number) {
    const signer = getSigner()
    const contract = getContract(signer)
    const tx = await contract.castVote(candidateIdx)
    console.log("tx", tx)
    await tx.wait()
    console.log('tx mined')
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="p-3 border border-red-300 rounded-md">
      {/*
      candidates
      candidateIdxToVoteCount
      getWinners
      */}
      <button className="border border-gray-400 px-2 py-1 rounded ml-2" onClick={beginPoll}>Begin poll</button>
      <button className="border border-gray-400 px-2 py-1 rounded ml-2" onClick={() => castVote(1)}>Vote for 2nd candidate</button>

      <ul>
        {candidates.map((candidate) => <li>{candidate}</li>)}
      </ul>
    </div>
  )
}