// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";
import {Vote} from "../src/Vote.sol";
import {VoteToken} from "../src/VoteToken.sol";
import {Vault} from "../src/Vault.sol";

contract DeployVote is Script {
  function run() public returns (Vote) {
    vm.startBroadcast();

    Vault vault = new Vault();
    VoteToken voteToken = new VoteToken(address(vault));

    vault.initVault(voteToken, address(this));

    Vote vote = new Vote(VoteToken, vault);

    vm.stopBroadcast();

    return vote;
  }
}
