// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {IVoteToken} from "./IVoteToken.sol";

interface IVault {
  function vaultInitialized() external returns (bool);

  function initVault(IVoteToken voteToken, address managerContract) external;
}
