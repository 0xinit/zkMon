// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol";


contract RandomCoordinates is
    VRFV2WrapperConsumerBase,
    ConfirmedOwner{
  event RequestSent(uint256 requestId, uint32 numWords);
  event EnemyCoord(uint256 requestId,uint256[] coords);
    event RequestFulfilled(
        uint256 requestId,
        uint256[] randomWords,
        uint256 payment
    );

    struct RequestStatus {
        uint256 paid; // amount paid in link
        bool fulfilled; // whether the request has been successfully fulfilled
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // Depends on the number of requested values that you want sent to the 
    // fulfillRandomWords() function. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 300000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
    uint32 numWords = 2;

    uint256 private nonce = 0;

    // Address LINK - hardcoded for Sepolia
    address linkAddress;

    // address WRAPPER - hardcoded for Sepolia
    address wrapperAddress;


    uint256[] public generatedArray;

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    constructor(address _linkaddress,address _wrapperAddress)
        ConfirmedOwner(msg.sender)
        VRFV2WrapperConsumerBase(_linkaddress, _wrapperAddress)
    {
        linkAddress=_linkaddress;
        wrapperAddress=_wrapperAddress;
    }

    function requestRandomWords()
        external
        returns (uint256 requestId)
    {
        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            randomWords: new uint256[](0),
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].paid > 0, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(
            _requestId,
            _randomWords,
            s_requests[_requestId].paid
        );
    }

    function getRequestStatus(
        uint256 _requestId
    )
        external
        view
        returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)
    {
        require(s_requests[_requestId].paid > 0, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords);
    }

    function genEnemyCoord() external view returns(uint256[] memory) {
    RequestStatus memory request = s_requests[lastRequestId];

   uint256[] memory generatedcoord = new uint256[](10); // Initialize with size 10

    if(request.fulfilled){
    
    uint256[] memory random = request.randomWords;

    for (uint256 i = 1; i < 10; i += 2) {
        generatedcoord[i] = (random[0] % 10); 
    }

    for (uint256 i = 0; i < 10; i += 2) {
        generatedcoord[i] = (random[1] % 10);
    }
    } else {
      uint256[] memory random = new uint256[](2);
      random[0]=uint(block.timestamp);
      random[1]=uint(block.timestamp+1000000);


    for (uint256 i = 1; i < 10; i += 2) {
        generatedcoord[i] = (random[0] % 10); 
    }

    for (uint256 i = 0; i < 10; i += 2) {
        generatedcoord[i] = (random[1] % 10);
    }  
    }
    

    return generatedcoord;
}


      

    // function getRandomNumber(uint256 max) public view returns (uint256) {
    //     uint256 random = uint256(keccak256(abi.encodePacked(
    //         block.timestamp,  // current block timestamp
    //         block.difficulty, // current block difficulty
    //         msg.sender,       // address of the caller
    //         nonce             // a nonce that increments each call
    //     ))) % max;

    //     return random;
    // }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }




  
}