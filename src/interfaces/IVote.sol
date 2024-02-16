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

  function candidates() external returns (string[3]);

  function castVote(uint256 candidateIdx) external;

  function tallyVotes() external view returns (string[] memory);

  function declareWinner() external returns (string memory);

  function getTokenRewardBonusAmount() external view returns (uint256 memory);

  function claimRewardBonus() external;

  function checkIfSenderAlreadyVoted() external view returns (bool);
}

// interface ISoulmate {
//     function idToCreationTimestamp(uint256 id) external returns (uint256);

//     function soulmateOf(address soulmate) external returns (address);

//     function sharedSpace(uint256 id) external returns (string memory);

//     function ownerToId(address owner) external returns (uint256);

//     function mintSoulmateToken() external returns (uint256);

//     function tokenURI(uint256) external pure returns (string memory);

//     function transferFrom(address from, address to, uint256 id) external;

//     function writeMessageInSharedSpace(string calldata message) external;

//     function readMessageInSharedSpace()
//         external
//         view
//         returns (string memory message);

//     function getDivorced() external;

//     function isDivorced() external view returns (bool);

//     function totalSupply() external view returns (uint256);

//     function totalSouls() external view returns (uint256);

//     function checkIfSenderFound() external view;
    
//     function checkIfSoulmateFound() external view;
// }
