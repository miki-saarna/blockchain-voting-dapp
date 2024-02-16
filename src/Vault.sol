// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

// import {IVoteToken} from "./interfaces/IVoteToken.sol";
import {VoteToken} from "./VoteToken.sol";

contract Vault {
  error Vault__AlreadyInitialized();

  bool public vaultInitialized;

  function initVault(VoteToken voteToken, address managerContract) public {
    if (vaultInitialized) revert Vault__AlreadyInitialized();
    voteToken.initVault(managerContract);
    vaultInitialized = true;
  }
}
