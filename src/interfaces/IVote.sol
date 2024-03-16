// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

interface IVote {

  function pollEndTime() external returns (uint256);

  function voteRewardAmount() external returns (uint256);

  function voteRewardBonusAmount() external returns (uint256);

  function voteRewardBonusMaxAmount() external returns (uint256);

  function totalVoteCount() external returns (uint256);

  function totalRegisteredVoters() external returns (uint256);

  function candidateIdxToVoteCount(uint256 candidateIdx) external returns (uint256);

  function candidates() external returns (string[3] memory);

  function castVote(uint256 candidateIdx) external;

  function getWinners() external view returns (string[] memory);

  function endPoll() external;

  function getTokenRewardBonusAmount() external view returns (uint256);

  function claimRewardBonus() external;

  function checkIfSenderAlreadyVoted() external view returns (bool);
}
