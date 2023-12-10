// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {GameEnginezkMON} from "./pixel.sol"; 

contract MyTokenSender is OwnerIsCreator {
    IRouterClient private myRouter;
    LinkTokenInterface private myLinkToken;
    address private bnmToken;
    address private GameEnginezkMON; 

    uint64 private myBaseChainSelector; 

    //16015286601757825753

    error InsufficientBalance(uint256 currentBalance, uint256 calculatedFees);

    constructor(address router, address link, address pixels, address _bnmToken, uint64 _chainselctor) {
        myRouter = IRouterClient(router);
        myLinkToken = LinkTokenInterface(link);
        GameEnginezkMON = pixels;
        bnmToken = _bnmToken;
        myBaseChainSelector = _chainselctor;
    }

    function sendTokens(uint256 tokenID, uint amount) external returns (bytes32 messageId) {
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
        Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({
            token: bnmToken,
            amount: amount
        });
        tokenAmounts[0] = tokenAmount;

        Client.EVM2AnyMessage memory message = _buildCCIPMessage(
            GameEnginezkMON,
            tokenID,
            bnmToken,
            amount,
            address(myLinkToken)
        );

        uint256 fees = myRouter.getFee(myBaseChainSelector, message);

        if (fees > myLinkToken.balanceOf(address(this))) {
            revert InsufficientBalance(myLinkToken.balanceOf(address(this)), fees);
        }

        myLinkToken.approve(address(myRouter), type(uint256).max);
        IERC20(bnmToken).approve(address(myRouter), type(uint256).max);

        messageId = myRouter.ccipSend(myBaseChainSelector, message);
    }

    function withdrawToken(address beneficiary, address tokenAdd) external onlyOwner {
        uint256 amount = IERC20(tokenAdd).balanceOf(address(this));
        IERC20(tokenAdd).transfer(beneficiary, amount);
    }

    function _buildCCIPMessage(
        address receiver,
        uint256 tokenID,
        address token,
        uint256 amount,
        address feeTokenAddress
    ) private view returns (Client.EVM2AnyMessage memory) {
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
        tokenAmounts[0] = Client.EVMTokenAmount({
            token: token,
            amount: amount
        });

        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(receiver),
                data: abi.encodeWithSignature("sale_complete(uint256,address)", tokenID, msg.sender),
                tokenAmounts: tokenAmounts,
                extraArgs: Client._argsToBytes(
                    Client.EVMExtraArgsV1({gasLimit: 900_000})
                ),
                feeToken: feeTokenAddress
            });
    }
}
