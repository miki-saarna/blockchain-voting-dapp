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
    <div className="p-3 border border-red-300 rounded-md">
      <div>
        <div>Status: {pollStartTime && !pollEndTime ? 'active' : 'inactive'}</div>
        <div>pollStartTime: {pollStartTime ? pollStartTime?.toString() : 'Not set'}</div>
        <div>pollEndTime: {pollEndTime ? pollEndTime?.toString() : 'Not set'}</div>
      </div>

      {/* candidates
      candidateIdxToVoteCount
      getWinners */}
      
      {/*
      totalRegisteredVoters
      totalVoteCount

      ownerVoted
      checkIfSenderAlreadyVoted
      */}

      {/* voteRewardAmount
      claimedRewardBonus
      getTokenRewardBonusAmount */}
      <div>
        <div>{voteRewardAmount}</div>
        <div>{voteRewardBonusAmount}</div>
        <div>{maxBonusAmount}</div>
      </div>

    </div>
  )
}