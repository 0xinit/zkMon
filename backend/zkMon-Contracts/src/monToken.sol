// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract monToken is ERC20 {
    constructor()
        ERC20("monToken", "Mon")  
    {}

    function mint(address to, uint256 amount) public  {
        _mint(to, amount);
    }
}