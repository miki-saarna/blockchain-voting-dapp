import { JSX, useState, useEffect, useRef, KeyboardEvent } from 'react';
import { getProvider, getSigner, getContract} from '../utils/blockchainInteractions';
import Button from '../components/button';
import LoadingOverlay from '../components/loadingOverlay'
import TextInput from '../components/textInput'
import { UserIcon, TrashIcon } from '@heroicons/react/24/solid'

export default function Poll({
  isPollActive,
  setPollStartTime,
  setPollEndTime,
  checkIfSenderAlreadyVoted,
  setCheckIfSenderAlreadyVoted,
  isWalletConnected
}: {
  isPollActive: boolean,
  setPollStartTime: Function,
  setPollEndTime: Function,
  checkIfSenderAlreadyVoted: boolean,
  setCheckIfSenderAlreadyVoted: Function,
  isWalletConnected: boolean
}): JSX.Element {

  const [newPollCandidates, setNewPollCandidates] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [candidateVoteCount, setCandidateVoteCount] = useState<any[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>()

  const [provider, setProvider] = useState<any>()
  const [signer, setSigner] = useState<any>()

  const inputRef = useRef<HTMLInputElement>(null);

  const getProviderAndSigner = async () => {
    const retrievedProvider = getProvider()
    setProvider(retrievedProvider)
    const retreivedSigner = await retrievedProvider.getSigner()
    setSigner(retreivedSigner)
  }

  useEffect(() => {
    if (isWalletConnected) {
      getProviderAndSigner()
      fetchCandidates();
    }
  },[isWalletConnected])
  // useEffect -> assign provider
  // within functions that use signer, use provider.getSigner()

  useEffect(() => {
    if (isWalletConnected) {
      getCandidateVoteCount();
    }
  }, [candidates]);

  function addNewCandidate(): void {
    const inputEl: any = inputRef.current
    if (inputEl && inputEl.value) {
      const inputValueFoundIdx = newPollCandidates.indexOf(inputEl.value);
      if (inputValueFoundIdx !== -1) return
      setNewPollCandidates([...newPollCandidates, inputEl.value])
      inputEl.value = ''
      inputEl.focus()
    }
  }

  function keyUpHandler(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      addNewCandidate()
    }
  }

  function removeNewCandidate(idx: number): void {
    setNewPollCandidates(newPollCandidates.filter((_, index) => index !== idx));
  }

  async function beginPoll() {
    setIsLoading(true)
    let contract
    try {
      // const signer = getSigner()
      contract = getContract(signer)
      
      const tx = await contract.beginPoll(newPollCandidates)
      console.log("tx", tx)
      await tx.wait()
      console.log('tx mined')
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      return
    }
    // set candidates!
    setCandidates(newPollCandidates)
    setNewPollCandidates([])

    try {
      const startTime = await contract.pollStartTime();
      setPollStartTime(startTime.toString());
      setPollEndTime(null);
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      return
    }
    // await getCandidateVoteCount()
    setWinners([])
    setIsLoading(false)
    setCheckIfSenderAlreadyVoted(false)
  }

  const endPoll = async () => {
    setIsLoading(true)
    try {
      // const signer = await getSigner();
      const contract = getContract(signer);
      await contract.endPoll();
  
      const endTime = await contract.pollStartTime();
      setPollEndTime(endTime.toString());
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      return
    }
    await getWinners();
    setIsLoading(false)
  };

  const getWinners = async () => {
    try {
      const provider = getProvider();
      const contract = getContract(provider);
      const winners: string[] = await contract.getWinners();
      setWinners(winners)
    } catch (err) {
      console.log(err)
    }
  }

  // needs provider because at time of init, provider doesn't exist yet
  const fetchCandidates = async () => {
    const provider = getProvider();
    const contract = getContract(provider);
    let candidatesLength: bigint
    try {
      candidatesLength = await contract.getNumberOfCandidates();
    } catch (err) {
      console.log(err)
      return
    }
    let candidatesList = [];
    for (let i = 0; i < candidatesLength; i++) {
      const candidate = await contract.candidates(i);
      candidatesList.push(candidate);
    }
    setCandidates(candidatesList);
    await getWinners();
  };

  async function submitVote(e: Event): Promise<void> {
    e.preventDefault();
    setIsLoading(true)
    const formEl: any = document.getElementById('pollForm');
    const selectedIdx: number = Number(formEl.elements["poll"].value);

    // const signer = getSigner()
    try {
      const contract = getContract(signer)
      const tx = await contract.castVote(selectedIdx)
      console.log("tx", tx)
      await tx.wait()
      console.log('tx mined')
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      return
    }

    candidateVoteCount[selectedIdx]++
    setCheckIfSenderAlreadyVoted(true);
    setIsLoading(false)
  }

  const getCandidateVoteCount = async(): Promise<any> => {
    let voteCount
    try {

      // const provider = getProvider()
      const contract = getContract(provider)
      voteCount = candidates.map(async (_, idx) => {
        const voteCount: number = await contract.candidateIdxToVoteCount(idx)
        return Number(voteCount);
      })
    } catch (err) {
      console.log(err)
      return
    }
    const candidateVoteCount = await Promise.all(voteCount);
    setCandidateVoteCount(candidateVoteCount)
  }

  

  return (
    <div className="relative bg-white border border-sage-dark rounded-md overflow-hidden">
      {isLoading && <LoadingOverlay />}

      <div className="p-3 text-lg font-bold bg-teal border-b border-sage-dark">Poll</div>
      <div className="p-3 divide-y divide-sage-dark text-sm">
        <div className="pb-3">
          {!isWalletConnected && <div className="mb-1 text-xs text-red-500">Connection to MetaMask is required to interact with this smart contract!</div>}
          {!isPollActive &&
            <div>
              <div>Add at least 2 candidates to begin the poll!</div>
              <div className="mt-2 flex items-center">
                <TextInput disabled={!isWalletConnected} onKeyUp={keyUpHandler} ref={inputRef} className="disabled:bg-gray-100 disabled:cursor-not-allowed" />
                <Button disabled={!isWalletConnected} onClick={addNewCandidate} className="ml-2 items-center bg-zest border border-sage-dark font-bold flex disabled:bg-zest/50 disabled:border-sage-dark/50 disabled:text-sage-dark/50 disabled:cursor-not-allowed">
                  <span>Add</span>
                  <UserIcon className="ml-0.5 w-3.5 h-3.5" />
                  </Button>
              </div>
              {!!newPollCandidates.length &&
                <>
                  <div className="mt-2">New candidates:</div>
                  <ol className="mt-1">
                    {newPollCandidates.map((candidate, idx) =>
                      <li key={idx} className="flex items-center">
                        <span className="font-bold">{candidate}</span>
                        <button onClick={() => removeNewCandidate(idx)} className="ml-1 p-0.5"><TrashIcon className="w-3.5 h-3.5 text-red-500" /></button>
                      </li>
                    )}
                  </ol>
                </>
              }
            </div>
          }

          {isPollActive
            ? <Button disabled={!isWalletConnected || isLoading} onClick={endPoll} className="w-fit bg-zest border border-sage-dark font-bold disabled:bg-zest/50 disabled:border-sage-dark/50 disabled:text-sage-dark/50 disabled:cursor-not-allowed">End poll</Button>
            : <Button disabled={!isWalletConnected || isLoading || newPollCandidates.length < 2} onClick={beginPoll} className="mt-2 w-fit bg-zest border border-sage-dark font-bold disabled:bg-zest/50 disabled:border-sage-dark/50 disabled:text-sage-dark/50 disabled:cursor-not-allowed">Initiate new poll</Button>
          }


        </div>

        <div className="py-3">
          <div className="mb-1 font-bold">Polling results:</div>
          <ul>
            {candidateVoteCount.map((count, idx) =>
            <li key={idx}>{candidates[idx]}: {count ? count : 0}</li>
            )}
          </ul>
        </div>

        {isPollActive && !checkIfSenderAlreadyVoted &&
          <form id="pollForm" className={`${winners.length ? 'py-3' : 'pt-3'}`}>
            <fieldset>
              <legend className="mb-1 font-bold">Please select a candidate:</legend>
              {candidates.map((candidate, idx) =>
                <div key={idx}>
                  <input type="radio" id={candidate} name="poll" value={idx} />
                  <label htmlFor={candidate} className="ml-1">{candidate}</label>
                </div>
              )}
            </fieldset>
            <Button
              disabled={!isWalletConnected || isLoading}
              onClick={submitVote}
              className="mt-3 w-fit bg-zest border border-sage-dark font-bold disabled:bg-zest/50 disabled:border-sage-dark/50 disabled:text-sage-dark/50 disabled:cursor-not-allowed"
            >
              Submit vote
            </Button>
          </form>
        }

        {!isPollActive && <div className="pt-3 text-xl font-bold">Winner: {winners.join(', ')}</div>}
      </div>
    </div>
  )
}