import React, { useState, useEffect } from 'react';
import { getProvider, getSigner, getContract} from '../utils/blockchainInteractions';

export default function Details({
  pollStartTime,
  pollEndTime,
}: {
  pollStartTime: Date | null,
  pollEndTime: Date | null
}) {

  const [voteRewardAmount, setVoteRewardAmount] = useState(0);
  const [voteRewardBonusAmount, setVoteRewardBonusAmount] = useState(0);
  const [maxBonusAmount, setMaxBonusAmount] = useState(0);
  const [totalRegisteredVoters, setTotalRegisteredVoters] = useState(0);
  const [totalVoteCount, setTotalVoteCount] = useState(0);
  const [checkIfSenderAlreadyVoted, setCheckIfSenderAlreadyVoted] = useState(false);

  const setMaxBonusAmountFunc = async () => {
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

  useEffect(() => {
    setMaxBonusAmountFunc();
  }, [])

  return (
    <div className="flex flex-col divide-y p-3 border border-red-300 rounded-md text-sm">
      <div className="pb-3">
        <div><span className="font-bold">Status:</span> {pollStartTime && !pollEndTime ? 'active' : 'inactive'}</div>
        <div><span className="font-bold">Start time:</span> {pollStartTime ? pollStartTime?.toString() : 'Not set'}</div>
        <div><span className="font-bold">End time:</span> {pollEndTime ? pollEndTime?.toString() : 'Not set'}</div>
      </div>
      <div className="py-3">
        <div><span className="font-bold">Vote reward amount:</span> {voteRewardAmount}</div>
        <div><span className="font-bold">Vote reward bonus amount:</span> {voteRewardBonusAmount}</div>
        <div><span className="font-bold">Vote reward max bonus amount:</span> {maxBonusAmount}</div>
      </div>
      <div className="pt-3">
        <div><span className="font-bold">Total registered voters:</span> {totalRegisteredVoters}</div>
        <div><span className="font-bold">Total vote count:</span> {totalVoteCount}</div>
        <div><span className="font-bold">Already voted:</span> {checkIfSenderAlreadyVoted ? 'true' : 'false'}</div>
      </div>

    </div>
  )
}