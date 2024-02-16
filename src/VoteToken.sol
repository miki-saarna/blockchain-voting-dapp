// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IVote} from "./interfaces/IVote.sol";

contract VoteToken is ERC20 {

  error VoteToken__Unauthorized();
  event VoteVaultInitialized(address indexed voteVaultContract);

  address public immutable voteVault;

  constructor(address _voteVault) ERC20("VoteToken", "VOTE") {
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
