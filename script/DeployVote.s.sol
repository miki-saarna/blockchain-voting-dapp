// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";
import {Vote} from "../src/Vote.sol";
import {VoteToken} from "../src/VoteToken.sol";
import {Vault} from "../src/Vault.sol";

import {IVote} from "../src/interfaces/IVote.sol";
import {IVoteToken} from "../src/interfaces/IVoteToken.sol";
import {IVault} from "../src/interfaces/IVault.sol";

contract DeployVote is Script {
  function run() public returns (Vote) {
    vm.startBroadcast();

    Vault vault = new Vault();
    VoteToken voteToken = new VoteToken(address(vault));

    // IVoteToken iVoteToken = IVoteToken(address(voteToken));
    vault.initVault(voteToken, address(this));

    Vote vote = new Vote(voteToken, vault);

    vm.stopBroadcast();

    return vote;
  }
}
