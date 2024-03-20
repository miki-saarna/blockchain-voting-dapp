import { JSX, useState, useEffect } from 'react';
import { getProvider, getSigner, getContract} from '../utils/blockchainInteractions';
import Button from '../components/button';

export default function Poll({
  setPollStartTime,
  setPollEndTime,
  setCheckIfSenderAlreadyVoted
}: {
  setPollStartTime: Function,
  setPollEndTime: Function,
  setCheckIfSenderAlreadyVoted: Function
}): JSX.Element {

  const [candidates, setCandidates] = useState<any[]>([]);
  const [candidateVoteCount, setCandidateVoteCount] = useState<any[]>([]);
  const [winners, setWinners] = useState<string[]>([]);

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
    setPollEndTime(null);
    await getCandidateVoteCount()
    setWinners([])
  }

  const endPoll = async () => {
    const signer = await getSigner();
    const contract = getContract(signer);
    await contract.endPoll();

    const endTime = await contract.pollStartTime();
    setPollEndTime(endTime.toString());

    await getWinners();
  };

  const getWinners = async () => {
    const provider = getProvider();
    const contract = getContract(provider);
    const winners: string[] = await contract.getWinners();
    setWinners(winners)
  }

  const fetchCandidates = async () => {
    const provider = getProvider();
    const contract = getContract(provider);
    const candidatesLength: bigint = await contract.getNumberOfCandidates();
    let candidatesList = [];
    for (let i = 0; i < candidatesLength; i++) {
      const candidate = await contract.candidates(i);
      candidatesList.push(candidate);
    }
    setCandidates(candidatesList);
  };

  async function submitVote(e: Event): Promise<void> {
    e.preventDefault();
    const formEl: any = document.getElementById('pollForm');
    const selectedIdx: number = Number(formEl.elements["poll"].value);

    const signer = getSigner()
    const contract = getContract(signer)
    const tx = await contract.castVote(selectedIdx)
    console.log("tx", tx)
    await tx.wait()
    console.log('tx mined')

    candidateVoteCount[selectedIdx]++
    setCheckIfSenderAlreadyVoted(true);
  }

  const getCandidateVoteCount = async(): Promise<any> => {
    const provider = getProvider()
    const contract = getContract(provider)

    const voteCount = candidates.map(async (_, idx) => {
      const voteCount: number = await contract.candidateIdxToVoteCount(idx)
      return Number(voteCount);
    })
    const candidateVoteCount = await Promise.all(voteCount);
    setCandidateVoteCount(candidateVoteCount)
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    getCandidateVoteCount();
  }, [candidates]);

  return (
    <div className="p-3 border border-red-300 rounded-md">
      <Button
        onClick={beginPoll}
        className="w-fit bg-gray-800 font-bold"
      >
        Begin poll
      </Button>
      <Button
        onClick={endPoll}
        className="w-fit bg-gray-800 font-bold"
      >
        End poll
      </Button>

      <ul className="border">
        {candidateVoteCount.map((count, idx) =>
        <li>{candidates[idx]}: {count ? count : 0}</li>
        )}
      </ul>

      <form id="pollForm">
        <fieldset>
          <legend>Please select your preferred contact method:</legend>
          <div>
            {candidates.map((candidate, idx) =>
              <>
                <input type="radio" id={candidate} name="poll" value={idx} />
                <label>{candidate}</label>
                {/* <label for="contactChoice1">Email</label> */}
              </>
            )}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </fieldset>

        <Button
          onClick={submitVote}
          className="w-fit bg-gray-800 font-bold"
        >
          Submit vote
        </Button>
      </form>

      {winners.length ? <div>Winner: {winners.join(', ')}</div> : null}
    </div>
  )
}