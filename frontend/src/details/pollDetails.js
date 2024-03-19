import React, { useState, useEffect } from 'react';
import { getProvider, getSigner, getContract} from '../utils/blockchainInteractions';

export default function Test({
  pollStartTime,
  pollEndTime,
  candidates
}) {

  const [voteRewardAmount, setVoteRewardAmount] = useState(0);
  const [voteRewardBonusAmount, setVoteRewardBonusAmount] = useState(0);
  const [maxBonusAmount, setMaxBonusAmount] = useState(0);

  const setMaxBonusAmountFunc = async () => {
    const provider = getProvider()
    const contract = getContract(provider)
    const amount0 = await contract.voteRewardAmount()
    const amount1 = await contract.voteRewardBonusAmount()
    const amount2 = await contract.voteRewardBonusMaxAmount()
    setVoteRewardAmount(amount0.toString())
    setVoteRewardBonusAmount(amount1.toString())
    setMaxBonusAmount(amount2.toString())
  }

  useEffect(() => {
    setMaxBonusAmountFunc();
  }, [])

  return (
    <div className="border border-red-300">
      <div>
        <div>Status: {pollStartTime && !pollEndTime ? 'active' : 'inactive'}</div>
        <div>pollStartTime: {pollStartTime}</div>
        <div>pollEndTime: {pollEndTime}</div>
      </div>

      {/* candidates
      candidateIdxToVoteCount
      getWinners */}
      <ul>
        {candidates.map((candidate) => <li>{candidate}</li>)}
      </ul>
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