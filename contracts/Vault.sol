// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

// import {IVoteToken} from "./interfaces/IVoteToken.sol";
import {VoteToken} from "./VoteToken.sol";

contract Vault {
  error Vault__AlreadyInitialized();

  bool public vaultInitialized;
  VoteToken private voteToken;

  function initVault(VoteToken _voteToken, address managerContract) public {
    if (vaultInitialized) revert Vault__AlreadyInitialized();
    voteToken = _voteToken;
    _voteToken.initVault(managerContract);
    vaultInitialized = true;
  }

  function approve(address spender, uint256 amount) external returns (bool) {
    return voteToken.approve(spender, amount);
  }
}
