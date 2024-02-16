// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {IVote} from "./interfaces/IVote.sol";


contract VoteToken is ERC20 {

  error VoteToken__Unauthorized();

  IVote public immutable voteContract;
  address public immutable voteVault;

  event VoteVaultInitialized(address indexed voteVaultContract);

  constructor(
   IVote _voteContract,
   address _voteVault
  ) ERC20("VoteToken", "VOTE", 18) {
    voteContract = _voteContract;
    voteVault = _voteVault;
  }

  function initVault(address managerContract) public {
    if (msg.sender == voteVault) {
      _mint(voteVault, 500_000_000 ether);
      approve(managerContract, 500_000_000 ether);
      emit VoteVaultInitialized(managerContract);
    } else revert VoteToken__Unauthorized();
  }
}
