// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "forge-std/console.sol";

import {Script} from "forge-std/Script.sol";
import {Vote} from "../contracts/Vote.sol";
import {VoteToken} from "../contracts/VoteToken.sol";
import {Vault} from "../contracts/Vault.sol";

import {IVote} from "../contracts/interfaces/IVote.sol";
import {IVoteToken} from "../contracts/interfaces/IVoteToken.sol";
import {IVault} from "../contracts/interfaces/IVault.sol";

contract DeployVote is Script {
  event VoteContractDeployed(address indexed voteAddress);

  Vote vote;

  function run() public {
    vm.startBroadcast();

    Vault vault = new Vault();
    VoteToken voteToken = new VoteToken(address(vault));
    vault.initVault(voteToken, address(this));
    vote = new Vote(voteToken, vault);
    emit VoteContractDeployed(address(vote));

    vm.stopBroadcast();
  }
}
