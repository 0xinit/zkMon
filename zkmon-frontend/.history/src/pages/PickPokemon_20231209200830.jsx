import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const TakeLoan = ({ signer, provider, account, tokenId, setTokenId, , ,  }) => {
  const [selectedNft, setSelectedNft] = useState(null);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeLendingContract, setActiveLendingContract] = useState(null);
  const [tokenID, setTokenID] = useState('');
  const [tokenContractAddress, setTokenContractAddress] = useState('');
  const [borrowableUsd, setBorrowableUsd] = useState(null);

  useEffect(() => {
    if (!hasQueried) {
      getNFTsForOwnerAddress();
    }
    if (signer.provider.network.chainId === 80001) {
      setActiveLendingContract(lendBorrowContract.polygon);
    }
    if (signer.provider.network.chainId === 43113) {
      setActiveLendingContract(lendBorrowContract.avalanche);
    }

  }, [signer]); // Empty dependency array means this effect runs once when the component mounts

  async function getNFTsForOwnerAddress() {
    setIsLoading(true);
    setError(null);

    try {

      const tokenDataPromises = [];
      /*
      for (let i = 0; i < data.ownedNfts.length; i++) {
        const tokenData = alchemy.nft.getNftMetadata(
          data.ownedNfts[i].contract.address,
          data.ownedNfts[i].tokenId
        );
        tokenDataPromises.push(tokenData);
      }
      */

      const tokenDataResults = await Promise.all(tokenDataPromises);
      setTokenDataObjects(tokenDataResults);
      setHasQueried(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const checkCanWithDrawTokens = async () => {
    const address = await activeLendingContract?.signer?.getAddress();
    const hexTokenAmount = await activeLendingContract?.borrowingPowerInUSD(address);
    const tokenAmount = parseInt(hexTokenAmount._hex, 16);
    setBorrowableUsd(tokenAmount);
  }

  // Function to open the NFT pop-up
  const openPopup = (nft) => {
    setSelectedNft(nft);
    setTokenId(nft.tokenId);
  };

  // Function to close the NFT pop-up
  const closePopup = () => {
    setSelectedNft(null);
  };
  const handleDeposit = async () => {
    await activeLendingContract.depositNFT(tokenContractAddress, tokenID,{gasLimit:900000});
  }

  const withdrawTokens = async()=>{
    if(borrowableUsd>0){
      await activeLendingContract.withDrawTokens({ gasLimit: 300000 });
    }
  }

  return (
    <div className="bg-black text-green-400 min-h-screen p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      {/* NFTs */}
      <p className="text-3xl font-semibold mb-8">Available NFTs</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {tokenDataObjects.map((nft, index) => (
          <div className="bg-green-900 p-4 rounded-lg" key={index}>
            <img
              src={nft.rawMetadata.image}
              alt={nft.title}
              className="rounded-lg"
              style={{ height: '300px' }}
            />
            <div className="p-4">
              <p className="font-semibold text-xl text-green-400">{nft.title}</p>
              <p className="text-justify mt-3">{nft.description}</p>
              <button
                className="bg-green-500 text-black font-semibold py-3 rounded-xl mt-6 w-full"
                onClick={() => openPopup(nft)}
              >
                Take Loan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up/Modal */}
      {selectedNft && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-900 p-4 rounded-lg m-8 md:w-1/2">
            <div className="flex items-end justify-end">
              <AiFillCloseCircle
                className="text-3xl text-green-400 cursor-pointer"
                onClick={closePopup}
              />
            </div>
            <div className="flex items-center justify-center flex-col">
              <img
                src={selectedNft.rawMetadata.image}
                alt={selectedNft.title}
                className="rounded-lg"
                style={{ height: '300px' }}
              />
              <p className="font-semibold text-lg text-green-400 mt-3">
                {selectedNft.title}
              </p>
              <p className="text-justify mt-3">{selectedNft.description}</p>
              <button className="font-semibold bg-green-500 w-full rounded-lg py-3 mt-5">
                Start the Process 🔃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit NFT Form */}
      <div className="max-w-md mx-auto mt-6">
        <form className="bg-green-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-bold text-green-400 mb-2" htmlFor="tokenContractAddress">
              Token Contract Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-green-400 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenContractAddress"
              type="text"
              placeholder="Token Contract Address"
              value={tokenContractAddress}
              onChange={(e) => setTokenContractAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-green-400 mb-2" htmlFor="tokenID">
              Token ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-green-400 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenID"
              type="text"
              placeholder="Token ID"
              value={tokenID}
              onChange={(e) => setTokenID(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDeposit}
            >
              Deposit NFT
            </button>
          </div>
        </form>

        {/* Check Withdraw Amount Button */}
        <button className="font-semibold bg-green-500 w-full rounded-lg py-3 mt-5" onClick={checkCanWithDrawTokens}>
          Check Withdraw Amount
        </button>
      </div>

      {/* Borrow DUSD Button */}
      {borrowableUsd && signer && (
        <div className="max-w-md mx-auto">
          <button className="font-semibold bg-green-500 w-full rounded-lg py-3 mt-5" onClick={withdrawTokens}>
            Borrow DUSD {borrowableUsd}
          </button>
        </div>
      )}
    </div>
  );
};

export default TakeLoan;