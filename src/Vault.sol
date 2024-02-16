// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.23;

error Vault__AlreadyInitialized();

bool public vaultInitialized;

contract Vault {
  function initVault(IVoteToken voteToken, address managerContract) public {
    if (vaultInitialized) revert Vault__AlreadyInitialized();
    voteToken.initVault(managerContract);
    vaultInitialized = true;
  }
}
