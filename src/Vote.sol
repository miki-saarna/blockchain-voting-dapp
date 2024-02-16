// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

// import {IVoteToken} from "./interfaces/IVoteToken.sol";
// import {IVault} from "./interfaces/IVault.sol";
import {VoteToken} from "./VoteToken.sol";
import {Vault} from "./Vault.sol";

contract Vote {

  error Vote__PollNotClosed();
  error Vote__PollClosed(uint256 pollEndTime);
  error Vote__UserAlreadyVoted(address owner);
  error Vote__AllRegisteredVotersAlreadyVoted(address owner);
  error Vote__UserHasNotVoted();
  error Vote__UserAlreadyClaimedRewardBonus();

  VoteToken public immutable voteToken;
  Vault public immutable voteVault;
  
  uint256 public pollEndTime;
  uint256 public voteRewardAmount = 50;
  uint256 public voteRewardBonusAmount;
  uint256 public voteRewardBonusMaxAmount = 1000;
  uint256 public totalVoteCount = 0;
  uint256 public totalRegisteredVoters = 3000000;

  mapping(address owner => bool voted) private ownerVoted;
  mapping(address owner => bool claimed) private claimedRewardBonus;
  mapping (uint256 candidateIdx => uint256 voteCount) public candidateIdxToVoteCount;

  string[3] public candidates = ["Candidate 1", "Candidate 2", "Candidate 3"];

  constructor(VoteToken _voteToken, Vault _voteVault) {
    voteToken = _voteToken;
    voteVault = _voteVault;

    for (uint256 i = 0; i < candidates.length; i++) {
      candidateIdxToVoteCount[i] = 0;
    }
  }

  function castVote(uint256 candidateIdx) public {
    // add functionality to confirm msg.sender is a registered voter

    if (pollEndTime == 0) {
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
        endPoll();
      }
    }
  }

  function endPoll() public {
    pollEndTime = block.timestamp;
    voteRewardBonusAmount = getTokenRewardBonusAmount();
  }

  function getWinners() external view returns (string[] memory) {
    uint256 mostVotesAmount;
    uint256 numberOfWinners;

    for (uint i = 0; i < candidates.length; i++) {
      if (candidateIdxToVoteCount[i] > mostVotesAmount) {
        mostVotesAmount = candidateIdxToVoteCount[i];
        numberOfWinners = 1;
      } else if (candidateIdxToVoteCount[i] == mostVotesAmount) {
        numberOfWinners++;
      }
    }

    string[] memory winnerNames = new string[](numberOfWinners);

    uint index = 0;
    for (uint i = 0; i < candidates.length; i++) {
      if (candidateIdxToVoteCount[i] == mostVotesAmount) {
        winnerNames[index] = candidates[i];
        index++;
      }
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
      claimedRewardBonus[msg.sender] = true;
      voteToken.transferFrom(address(voteVault), msg.sender, voteRewardBonusAmount);
    }
  }

  function checkIfSenderAlreadyVoted() external view returns (bool) {
    return ownerVoted[msg.sender];
  }
}

