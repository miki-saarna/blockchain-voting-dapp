// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

// add functionality to incentivize voting

contract Vote {

  error Vote__UserAlreadyVoted(address owner, string candidate);
  
  uint256 voteId = 1;

  mapping(uint256 id => address owner) idToOwners;
  mapping(address owner => uint256 id) ownerToId;

  mapping(address owner => uint256 candidateIdx) ownerToCandidateIdx;

  [] public candidates = ["Candidate 1", "Candidate 2", "Candidate 3"];

  mapping (uint256 candidateIdx => uint256 voteCount) candidateToVoteCounts = {
    0: 0,
    1: 0,
    2: 0
  };

  function castVote(uint256 candidateIdx) {
    if (ownerToCandidateIdx[msg.sender] != 0) {
      revert Vote__UserAlreadyVoted(msg.sender, candidates[ownerToCandidateIdx[msg.sender]]);
    }

    ownerToCandidateIdx[msg.sender] = candidateIdx;
    candidateToVoteCounts[candidateIdx] += 1;
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
    []string winners = tallyVotes();
    if (winners.length > 1) {
      return "It's a tie!";
    } else {
      return winners[0];
    }
  }

}