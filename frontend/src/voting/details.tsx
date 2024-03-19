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

  const setMaxBonusAmountFunc = async () => {
    const provider = getProvider()
    const contract = getContract(provider)
    const voteRewardAmount = await contract.voteRewardAmount()
    const voteRewardBonusAmount = await contract.voteRewardBonusAmount()
    const voteRewardBonusMaxAmount = await contract.voteRewardBonusMaxAmount()
    setVoteRewardAmount(voteRewardAmount.toString())
    setVoteRewardBonusAmount(voteRewardBonusAmount.toString())
    setMaxBonusAmount(voteRewardBonusMaxAmount.toString())
  }

  useEffect(() => {
    setMaxBonusAmountFunc();
  }, [])

  return (
    <div className="p-3 border border-red-300 rounded-md text-sm">
      <div>
        <div><span className="font-bold">Status:</span> {pollStartTime && !pollEndTime ? 'active' : 'inactive'}</div>
        <div><span className="font-bold">Start time:</span> {pollStartTime ? pollStartTime?.toString() : 'Not set'}</div>
        <div><span className="font-bold">End time:</span> {pollEndTime ? pollEndTime?.toString() : 'Not set'}</div>
      </div>

      {/*
      getWinners
      totalRegisteredVoters
      totalVoteCount
      ownerVoted
      checkIfSenderAlreadyVoted
      */}
      <div>
        <div><span className="font-bold">Vote reward amount:</span> {voteRewardAmount}</div>
        <div><span className="font-bold">Vote reward bonus amount:</span> {voteRewardBonusAmount}</div>
        <div><span className="font-bold">Vote reward max bonus amount:</span> {maxBonusAmount}</div>
      </div>

    </div>
  )
}