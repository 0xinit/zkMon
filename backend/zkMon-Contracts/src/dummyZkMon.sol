// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts@4.8.0/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.8.0/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@4.8.0/access/Ownable.sol";

import "./egg.sol";
/*
    TODO
    ERC20 Contract
    NFT Contract
    VRF Contract to construct 
*/


contract GameContract is ERC1155, Ownable {
    string private _heroBaseURI;
    string private _villainBaseURI;

    IERC20 public token;

    EggNFT public eggNft;

 event BattleRegistered(address indexed player, uint256[] randomValues);

    enum Family { Water, Wind, Fire, Earth }

    enum BattleStatus {
        REGISTERED,
        INITIATED,
        FINISHED
    }

    struct Battle {
        address player;
        BattleStatus status;
        uint256 heroTokenId;
        uint256 villainTokenId;
        uint8[5] heroAttackSequence;
        uint8[5] heroDefenseSequence;
        uint8[5] villainAttackSequence;
        uint8[5] villainDefenseSequence;
    }

    struct villainToken{
        uint256 tokenId;
        string name;
        uint256 health;
        uint256 attackPower;
        uint256 defensePower;
        Family family;
    }

    struct heroToken{
        uint256 tokenId;
        string name;
        uint256 health;
        uint256 attackPower;
        uint256 defensePower;
    }    

    mapping(address => Battle) public battles;
    mapping(address => bool) public allowedUsers;
    mapping(address => uint256) public stakedTokens;

    event BattleInitiated(
        address player,
        uint256 heroTokenId,
        uint256 villainTokenId
    );
    event BattleFinished(
        address player,
        uint256 heroTokenId,
        uint256 villainTokenId,
        string result
    );

    constructor(string memory heroURI, string memory villainURI,address _token,string memory eggBaseURI) ERC1155("") {
        _heroBaseURI = heroURI;
        _villainBaseURI = villainURI;
        token = IERC20(_token);
        eggNft = new EggNFT(eggBaseURI);
    }

    function setBaseURI(string memory heroURI, string memory villainURI)
        external
        onlyOwner
    {
        _heroBaseURI = heroURI;
        _villainBaseURI = villainURI;
    }

    function registerForBattle(uint256 heroTokenId, uint256 villainTokenId)
        external
    {


 uint256 stakeAmount = 10 * 10**18; // Assuming token has 18 decimals

        // Check if the contract is allowed to pull the tokens
        require(token.allowance(msg.sender, address(this)) >= stakeAmount, "Token allowance too low");

        // Transfer the tokens from the user to this contract
        token.transferFrom(msg.sender, address(this), stakeAmount);

        // Update staked tokens mapping
        stakedTokens[msg.sender] += stakeAmount;

        require(
            battles[msg.sender].status == BattleStatus.FINISHED,
            "Battle in progress or already registered"
        );
        require(heroTokenId >= 0 && heroTokenId <= 5, "Invalid hero token ID");
        require(
            villainTokenId >= 6 && villainTokenId <= 8,
            "Invalid villain token ID"
        );

        battles[msg.sender] = Battle(
            msg.sender,
            BattleStatus.REGISTERED,
            heroTokenId,
            villainTokenId,
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        );



       uint256[] memory randomValues = getRandomValues();
        emit BattleRegistered(msg.sender, randomValues);
    }

    function getRandomValues() private view returns (uint256[] memory) {
        // Implement your random value generation logic here
        // This is a placeholder implementation, replace it with your actual logic
        uint256[] memory values = new uint256[](5);
        values[0] = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100;
        values[1] = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, values[0]))) % 100;
        values[2] = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, values[0], values[1]))) % 100;
        values[3] = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, values[0], values[2]))) % 100;
        values[4] = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, values[0], values[3]))) % 100;
        return values;
    }


    function initiateBattle(
        address player,
        uint8[5] memory heroAttackSeq,
        uint8[5] memory heroDefenseSeq
    )
        external
    {
        Battle storage battle = battles[player];
        require(
            battle.status == BattleStatus.REGISTERED,
            "Battle not registered"
        );
        //TODO: VRF which will return the attack sequence
        (
            uint8[5] memory villainAttackSeq,
            uint8[5] memory villainDefenseSeq
        ) = getAttactDefenseSequenceofEnemy();
        battle.heroAttackSequence = heroAttackSeq;
        battle.heroDefenseSequence = heroDefenseSeq;
        battle.villainAttackSequence = villainAttackSeq;
        battle.villainDefenseSequence = villainDefenseSeq;

        battle.status = BattleStatus.INITIATED;
        emit BattleInitiated(player, battle.heroTokenId, battle.villainTokenId);
        resolveBattle(msg.sender);
    }

    function resolveBattle(address player) internal {
        Battle storage battle = battles[player];
        require(
            battle.status == BattleStatus.INITIATED,
            "Battle not initiated"
        );
        /*
            TODO battle logic by iterating for loops (Azhar)
        */
        battle.status = BattleStatus.FINISHED;
    }


    function uri(uint256 tokenId) public view override returns (string memory) {
        if (tokenId >= 0 && tokenId <= 5) {
            return string(abi.encodePacked(_heroBaseURI, uri(tokenId)));
        } else if (tokenId >= 6 && tokenId <= 8) {
            return string(abi.encodePacked(_villainBaseURI, uri(tokenId)));
        } else {
            return "";
        }
    }

    function getAttactDefenseSequenceofEnemy()
        internal
        returns (uint8[5] memory, uint8[5] memory)
    {

        // to do takr values from vrf function which will communicate with vrf contract 
        uint256[5] memory radomArray = getRadmonNumbers();

        /*
            TODO's
            Use this random values array
            use for loop to iterate above array 
            on each value use % modulator operator 
            if it gives 0 then attack enemy will do use Enemy tokenId.attackstrength 
            if it gives 1 then defense enemy will do use Enemy TokenId.defenseStrenght
            for random numbers of 2,33,15,64,20 this is how it would look like
            attack sequence [1,0,0,1,1]
            defense sequence [0,1,1,0,0]

            og attack that we will return from this function [80,0,0,80,80] considering attackStrenght is 80
            og defense that we will return from this function [0,120,120,0,0] considering defnseStrenth is 1200
        */
        
        uint8[5] memory attackSequence = [
            /*This are just random values so function wont return error till we implement todos*/
            uint8(10),
            uint8(10),
            uint8(10),
            uint8(10),
            uint8(10)
        ];
        uint8[5] memory defenseSequence = [
            /*This are just random values so function wont return error till we implement todos*/
            uint8(10),
            uint8(10),
            uint8(10),
            uint8(10),
            uint8(10)
        ];
        return (attackSequence, defenseSequence);
    }

    function getRadmonNumbers() internal returns(uint256[5] memory){
        // todo get random values from chainlink vrf
    }
}
