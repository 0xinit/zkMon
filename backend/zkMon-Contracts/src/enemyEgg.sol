// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract enemyEgg is ERC721Enumerable, Ownable {
    constructor() ERC721("enemyEgg", "EEGG") Ownable(msg.sender) {}

    function mint(address to) public  {
        uint256 tokenId = totalSupply() + 1;
        _mint(to, tokenId);
    }
}
