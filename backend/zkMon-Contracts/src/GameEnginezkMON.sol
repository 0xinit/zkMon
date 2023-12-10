// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

interface RandomCoordinates{
    function requestRandomWords()
        external
        returns (uint256 requestId);
}

contract SimpleMonNFT is ERC721, Ownable {

  string public baseURI;


  constructor() ERC721("SimpleMonNFT", "MFT") Ownable(msg.sender){
    _mintInitialNFTs(msg.sender);
  }

 function mintNFT(address _minter,uint256 _tokenId) public {
  _safeMint(_minter, _tokenId); 
}
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function setBaseURI(string memory uri) public onlyOwner{
    baseURI = uri;
  }

  function _mintInitialNFTs(address _minter) private {

    for(uint i=0; i < 10; i++) {
      mintNFT(_minter,i); 
    }

  }

}

contract GameEnginezkMON is CCIPReceiver, Ownable {
   
     struct TokenListing {
        address seller;
        uint256 tokenId;
        bool isSold;
        uint256 price;
    }
     SimpleMonNFT public nft;
     IERC20 public bnmToken;

     int256 constant x1=12979493;

     int256 constant y1=77719656;

     RandomCoordinates  public randomcoor;
     


    mapping(uint256 => TokenListing) public tokenListings;

    event listing_added(address indexed owner, uint indexed token_id, uint indexed price_in_usdt);
    event listing_sold(address indexed seller, address indexed buyer, uint indexed timestamp);
    event NftMinted(uint[3] indexed tokenarray,address indexed user);


    constructor(address router, address _bnmToken) CCIPReceiver(router) Ownable(msg.sender) {
        nft = new SimpleMonNFT();
        bnmToken = IERC20(_bnmToken);
        nft.setBaseURI("https://gateway.pinata.cloud/ipfs/QmVT4tcmxy213iZ8qxbwh2AZ1698pV8F3a9jUtmN3ZrDFC/");
    }

    function updateRandomcon(address _addr) external{
        randomcoor=RandomCoordinates(_addr);
    }

  function listTokenForSale(uint256 tokenId, uint256 price) external {
        require(nft.getApproved(tokenId) == address(this), "Contract not approved");
        require(nft.ownerOf(tokenId) == msg.sender, "Not token owner");
        tokenListings[tokenId] = TokenListing(msg.sender, tokenId, false, price);
        emit listing_added(msg.sender, tokenId, price);
    }


    function finalizeSale(uint256 tokenId, address buyer) external {
        TokenListing storage listing = tokenListings[tokenId];
        require(!listing.isSold, "Token already sold");
        require(bnmToken.balanceOf(address(this)) >= listing.price, "Insufficient funds");
        nft.transferFrom(listing.seller, buyer, tokenId);
        listing.isSold = true;
        emit listing_sold(listing.seller, buyer, block.timestamp);
    }

    
     function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) 
        internal 
        override 
    {
        (bool success, ) = address(this).call(message.data);
        require(success);
    }
    

    function mintNFTforOwner(uint tokenID, address _to) public onlyOwner{
        nft.transferFrom(address(this), _to, tokenID);
    }



    function mintNFT(uint tokenID1,uint tokenID2, uint tokenID3, int256 latitude, int256 longitude, bool vrf) public returns(bool){

        int checker = getDistance(latitude,longitude);
        require((checker/10) < 201,"User outside the boundry");
        uint256[3] memory tokenarray=[tokenID1,tokenID2,tokenID3];

        for(uint i=0;i<tokenarray.length;++i){
        nft.mintNFT(msg.sender,tokenarray[i]);
        }
        emit NftMinted(tokenarray,msg.sender);
        
        if(vrf){
        randomcoor.requestRandomWords();
        }
        
        return true;
        
    }


     
    
    function nft_address() public view returns(address){
        return address(nft);
    }

    function get_price(uint256 _tokenID) public view returns(uint){
        return tokenListings[_tokenID].price;
    }

    function check_message() public {
        bytes memory message;
        message = abi.encodeWithSignature("sale_done(uint256,address)", 0, msg.sender);

        (bool success, ) = address(this).call(message);
        require(success);
    }

    function getDistance(int256 x2, int256 y2 ) public pure returns(int256) {
  return sqrt(((x2 - x1)**2) + ((y2 - y1)**2));
}

function sqrt(int256 x) private pure returns (int256 y) {
    if (x == 0) return 0;
    else if (x <= 3) return 1;
  int256 z = (x + 1) / 2;
    y = x;
    while (z < y) {
        y = z;
        z = (x / z + z) / 2;
    }
  }

}