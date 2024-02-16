// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {IVoteToken} from "./interfaces/IVoteToken.sol";
import {IVault} from "./interfaces/IVault.sol";

contract Vote {

  error Vote__PollNotClosed();
  error Vote__PollClosed(uint256 pollEndTime);
  error Vote__UserAlreadyVoted(address owner);
  error Vote__AllRegisteredVotersAlreadyVoted(address owner);
  error Vote__UserHasNotVoted;
  error Vote__UserAlreadyClaimedRewardBonus;
  
  uint256 public pollEndTime;
  uint256 public voteRewardAmount = 50;
  uint256 public voteRewardBonusAmount;
  uint256 public voteRewardBonusMaxAmount = 1000;
  uint256 public totalVoteCount = 0;
  uint256 public totalRegisteredVoters = 3000000;

  mapping(address owner => bool claimed) private claimedRewardBonus;
  mapping(address owner => bool voted) private ownerVoted;
  mapping (uint256 candidateIdx => uint256 voteCount) public candidateIdxToVoteCount = {
    0: 0,
    1: 0,
    2: 0
  };

  string[3] public candidates = ["Candidate 1", "Candidate 2", "Candidate 3"];

  constructor(
    IVoteToken _voteToken,
    IVault _voteVault
  ) {
    voteToken = _voteToken;
    voteVault = _voteVault;
  }

  function castVote(uint256 candidateIdx) public {
    // add functionality to confirm msg.sender is a registered voter

    if (pollEndTime) {
      revert Vote__PollClosed(pollEndTime);
    } else if (totalVoteCount == totalRegisteredVoters) {
      revert Vote__AllRegisteredVotersAlreadyVoted(msg.sender);
    } else if (ownerVoted[msg.sender]) {
      revert Vote__UserAlreadyVoted(msg.sender);
    } else {
      ownerVoted[msg.sender] = true;
      candidateIdxToVoteCount[candidateIdx] += 1;
      totalVoteCount += 1;

      voteToken.transferFrom(address(voteVault), msg.sender, voteRewardAmount);

      if (totalVoteCount == totalRegisteredVoters) {
        declareWinner();
      }
    }
  }

  function declareWinner() public returns (string memory) {
    pollEndTime = block.timestamp;

    string[] memory winners = tallyVotes();
    string memory winner;

    if (winners.length > 1) {
      winner = "It's a tie!";
    } else {
      winner = winners[0];
    }

    uint256 voteRewardBonusAmount = getTokenRewardBonusAmount();

    return winner;
  }

  function tallyVotes() public returns (string[] memory) {
    uint256 mostVotesCount = 0;
    uint256[] memory mostVotesIdx = [];
    for (uint i = 0; i < candidates.length; i++) {
      if (candidateIdxToVoteCount[i] > mostVotesCount) {
        mostVotesCount = candidateIdxToVoteCount[i];
        mostVotesIdx = [i];
      } else if (candidateIdxToVoteCount[i] == mostVotesCount) {
        mostVotesIdx.push(i);
      }
    }

    string[] memory winnerNames = [];
    for (uint i = 0; i < mostVotesIdx.length; i++) {
      winnerNames.push(candidates[i]);
    }

    return winnerNames;
    // emit VoteTally(candidate, voteCount);
  }

  function getTokenRewardBonusAmount() public view returns (uint256) {
    uint256 RewardBonusAmount = voteRewardBonusMaxAmount * ((totalVoteCount / totalRegisteredVoters) ** 2); // Solidity rounds this value down to nearest integer
    if (RewardBonusAmount == 0) {
      return 1;
    } else {
      return RewardBonusAmount;
    }
  }

  // Pull Mechanism:
  function claimRewardBonus() public {
    if (pollEndTime == 0) {
      revert Vote__PollNotClosed();
    } else if (!ownerVoted[msg.sender]) {
      revert Vote__UserHasNotVoted();
    } else if (claimedRewardBonus[msg.sender]) {
      revert Vote__UserAlreadyClaimedRewardBonus();
    } else {
      claimedRewardBonus[msg.sender] = true
      voteToken.transferFrom(address(voteVault), msg.sender, voteRewardBonusAmount)
    }
  }
}

  function checkIfSenderAlreadyVoted() external view returns (bool) {
    return ownerVoted[msg.sender];
  }
