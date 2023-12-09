// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";


contract zkMon is ERC721URIStorage, Ownable {

  string public baseURI;


  constructor() ERC721("ZkMon", "ZKM") Ownable(msg.sender){
    mintAllNFTs();
  }
}
