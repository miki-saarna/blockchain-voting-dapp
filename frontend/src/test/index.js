import React, { useState, useEffect } from 'react';
import './index.css'

export default function Test({
  pollStartTime,
  pollEndTime
}) {

  // useEffect(() => {

  // })

  return (
    <div className="test-container">
      <div>
        <div>Status: {pollStartTime && !pollEndTime ? 'active' : 'inactive'}</div>
        <div>pollStartTime: {pollStartTime}</div>
        <div>pollEndTime: {pollEndTime}</div>
      </div>

      {/* candidates
      candidateIdxToVoteCount
      getWinners

      totalRegisteredVoters
      totalVoteCount

      ownerVoted
      checkIfSenderAlreadyVoted

      voteRewardAmount
      voteRewardBonusAmount
      voteRewardBonusMaxAmount
      claimedRewardBonus
      getTokenRewardBonusAmount */}

    </div>
  )
}