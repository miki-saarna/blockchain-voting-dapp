import React, { useState, useEffect } from 'react';
import { getProvider, getSigner, getContract} from '../utils/blockchainInteractions';
import dayjs from 'dayjs';

export default function Details({
  isPollActive,
  pollStartTime,
  pollEndTime,
  checkIfSenderAlreadyVoted,
  setCheckIfSenderAlreadyVoted
}: {
  isPollActive: boolean,
  pollStartTime: BigInt | null,
  pollEndTime: BigInt | null,
  checkIfSenderAlreadyVoted: boolean,
  setCheckIfSenderAlreadyVoted: Function
}) {

  const divider: number = 1000000000000000000;

  const [voteRewardAmount, setVoteRewardAmount] = useState(0);
  const [voteRewardBonusAmount, setVoteRewardBonusAmount] = useState(0);
  const [maxBonusAmount, setMaxBonusAmount] = useState(0);
  const [totalRegisteredVoters, setTotalRegisteredVoters] = useState(0);
  const [totalVoteCount, setTotalVoteCount] = useState(0);

  const fetchData = async () => {
    const provider = getProvider()
    const contract = getContract(provider)
    const voteRewardAmount = await contract.voteRewardAmount()
    const voteRewardBonusAmount = await contract.voteRewardBonusAmount()
    const voteRewardBonusMaxAmount = await contract.voteRewardBonusMaxAmount()
    const totalRegisteredVoters = await contract.totalRegisteredVoters()
    const totalVoteCount = await contract.totalVoteCount()
    const checkIfSenderAlreadyVoted = await contract.checkIfSenderAlreadyVoted()
    setVoteRewardAmount(voteRewardAmount.toString())
    setVoteRewardBonusAmount(voteRewardBonusAmount.toString())
    setMaxBonusAmount(voteRewardBonusMaxAmount.toString())
    setTotalRegisteredVoters(totalRegisteredVoters.toString())
    setTotalVoteCount(totalVoteCount.toString())
    setCheckIfSenderAlreadyVoted(checkIfSenderAlreadyVoted)
  }

  function convertBigIntToDate(dateAsbigInt: BigInt | null): string {
    if (!dateAsbigInt) return 'not set';
    const timestamp = Number(dateAsbigInt);
    const formattedDate = dayjs(timestamp * 1000).format('MMM DD, YYYY [at] HH:mm:ss')

    return formattedDate
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="bg-white border border-sage-dark rounded-md overflow-hidden">
      <div className="p-3 text-lg font-bold bg-teal border-b border-sage-dark">Details</div>
      <div className="p-3 divide-y divide-sage-dark text-sm">
        <div className="pb-3">
          <div><span className="font-bold">Status:</span> {isPollActive ? <span className="text-green-500">active</span> : <span className="text-red-500">inactive</span>}</div>
          <div><span className="font-bold">Start time:</span> {convertBigIntToDate(pollStartTime)}</div>
          <div><span className="font-bold">End time:</span> {convertBigIntToDate(pollEndTime)}</div>
        </div>
        <div className="py-3">
          <div><span className="font-bold">Vote reward amount:</span> {voteRewardAmount / divider}</div>
          <div><span className="font-bold">Vote reward bonus amount:</span> {voteRewardBonusAmount / divider}</div>
          <div><span className="font-bold">Vote reward max bonus amount:</span> {maxBonusAmount / divider}</div>
        </div>
        <div className="pt-3">
          <div><span className="font-bold">Total registered voters:</span> {totalRegisteredVoters}</div>
          <div><span className="font-bold">Total vote count:</span> {totalVoteCount}</div>
          <div><span className="font-bold">Already voted:</span> {checkIfSenderAlreadyVoted ? 'true' : 'false'}</div>
        </div>
      </div>
    </div>
  )
}