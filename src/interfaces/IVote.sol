// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

interface IVote {
  function castVote(uint256 candidateIdx) public;

  function tallyVotes() returns (string[]);

  function declareWinner() returns (string);

  function getTokenRewardBonusAmount() returns (uint256);

  function claimRewardBonus();
}
