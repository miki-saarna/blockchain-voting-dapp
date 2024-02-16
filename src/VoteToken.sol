// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

error VoteToken__Unauthorized();

event VoteVaultInitialized(address indexed voteVaultContract);

contract VoteToken is ERC20 {

  constructor(
   _voteContract,
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
