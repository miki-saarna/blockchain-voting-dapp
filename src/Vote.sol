// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

// add functionality to incentivize voting; incentive exponentially increases as more people vote

contract Vote {

  error Vote__PollNotClosed();
  error Vote__PollClosed(uint256 pollEndTime);
  error Vote__UserAlreadyVoted(address owner, string candidate);
  error Vote__AllRegisteredVotersAlreadyVoted(address owner);
  error Vote__UserHasNotVoted;
  error Vote__UserAlreadyClaimedRewardBonus;
  
  uint256 voteId = 1;
  uint256 pollEndTime;
  uint256 voteRewardAmount = 50;
  uint256 voteRewardBonusAmount;
  uint256 voteRewardBonusMaxAmount = 1000;
  uint256 totalVoteCount = 0;
  uint256 totalRegisteredVoters = 3000000;

  mapping(uint256 id => address owner) idToOwners;
  mapping(address owner => uint256 id) ownerToId;

  mapping(address owner => bool claimed) claimedRewardBonus;

  mapping(address owner => uint256 candidateIdx) ownerToCandidateIdx;

  [] public candidates = ["Candidate 1", "Candidate 2", "Candidate 3"];

  mapping (uint256 candidateIdx => uint256 voteCount) candidateToVoteCounts = {
    0: 0,
    1: 0,
    2: 0
  };

  constructor(
        _voteToken,
        _voteVault
    ) {
        voteToken = _voteToken;
        voteVault = _voteVault;
    }

  function castVote(uint256 candidateIdx) {
    if (pollEndTime) {
      revert Vote__PollClosed(pollEndTime);
    }

    if (totalVoteCount == totalRegisteredVoters) {
      revert Vote__AllRegisteredVotersAlreadyVoted(msg.sender);
    }

    if (ownerToCandidateIdx[msg.sender] != 0) {
      revert Vote__UserAlreadyVoted(msg.sender, candidates[ownerToCandidateIdx[msg.sender]]);
    }

    ownerToCandidateIdx[msg.sender] = candidateIdx;
    candidateToVoteCounts[candidateIdx] += 1;
    totalVoteCount += 1;

    voteToken.transferFrom(address(voteVault), msg.sender, address(this), voteRewardAmount);
  }

  function tallyVotes() return ([]string) {
    uint256 mostVotes = 0;
    []uint256 mostVotesIdx = [];
    for (uint i = 0; i < candidates.length; i++) {
      if (candidateToVoteCounts[i] > mostVotes) {
        mostVotes = candidateToVoteCounts[i]
        mostVotesIdx = [i];
      } else if (candidateToVoteCounts[i] = mostVotes) {
        mostVotesIdx.push(i);
      }

      []string winnerNames = [];
      for (uint i = 0; i < mostVotesIdx.length; i++) {
        winnerNames.push(candidiates[i])
      }

      return winnerNames
      // emit VoteTally(candidate, voteCount);
    }

    return mostVotesIdx;
  }

  function declareWinner() returns (string) {
    pollEndTime = block.timestamp;

    []string winners = tallyVotes();
    string winner;

    if (winners.length > 1) {
      winner = "It's a tie!";
    } else {
      winner = winners[0];
    }

    uint256 voteRewardBonusAmount = getTokenRewardBonusAmount()

    return winner;
  }

  function getTokenRewardBonusAmount() returns (uint256) {
    uint256 RewardBonusAmount = voteRewardBonusMaxAmount * ((totalVoteCount / totalRegisteredVoters) ** 2); // Solidity rounds this value down to nearest integer
    if (RewardBonusAmount > 0) {
      return RewardBonusAmount;
    } else {
      return 1;
    }
  }

  // Pull Mechanism:
  function claimRewardBonus() {
    if (pollEndTime == 0) {
      revert Vote__PollNotClosed();
    } else if (!ownerToCandidateIdx[msg.sender]) {
      revert Vote__UserHasNotVoted();
    } else if (claimedRewardBonus[msg.sender]) {
      revert Vote__UserAlreadyClaimedRewardBonus();
    } else {
      claimedRewardBonus[msg.sender] = true
      voteToken.transferFrom(address(voteVault), msg.sender, voteRewardBonusAmount)
    }
  }
}
