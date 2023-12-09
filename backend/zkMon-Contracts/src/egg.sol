// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts@4.8.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.0/access/Ownable.sol";

contract EggNFT is ERC721, Ownable {
    uint256 public nextTokenId = 1;
    string private baseURI;

    mapping(uint256 => bool) public hatched;

    event EggHatched(address owner, uint256 tokenId);

    constructor(string memory _baseURI) ERC721("SMEgg", "SMEGG") {
        baseURI = _baseURI;
    }

    function _baseTokenURI() internal view virtual returns (string memory) {
        return baseURI;
    }

    function _tokenURI(uint256 tokenId) internal view virtual returns (string memory) {
        return string(abi.encodePacked(_baseTokenURI(), Strings.toString(tokenId)));
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function mint(address to) external onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        nextTokenId++;
    }

    function hatch(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "You don't own this token");
        require(!hatched[tokenId], "Egg already hatched");

        hatched[tokenId] = true;
        emit EggHatched(msg.sender, tokenId);
    }
}
