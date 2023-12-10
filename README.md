# zkMon - Onchain Pokémon Game

zkMon is an onchain Pokémon game that leverages blockchain technology, GPS location, and NFTs to provide an immersive gaming experience.

## Overview

The game integrates several key components to create a unique gaming environment:

- **Chainlink CCIP**: Utilizes Chainlink's Cross-Chain Interoperability Protocol (CCIP) to securely transfer data and tokens across chains. This ensures secure cross-chain functionality within the game.

- **VRF Randomness**: Implements Verifiable Random Function (VRF) from Chainlink to ensure fairness and unpredictability in battles.

- **GPS Integration**: Requires users to provide GPS location via the website. The Haversine formula is used within the smart contract to verify the user's location within the designated premises of KTPO.

## Flow of the Game

1. **Connection with Metamask**: Users connect their Metamask wallet to the game's website to interact with the blockchain.

2. **GPS Location Verification**: The website prompts users to share their GPS location. This information is used to confirm the user's presence within the specified KTPO premises.

3. **NFT Minting**: Users have the opportunity to mint NFTs based on their location verification. If confirmed within KTPO premises, NFT Pokémon can be minted.

4. **Battles**: Players engage in battles with Pokémon encountered in the game. The game uses VRF for randomness and fairness during battles.

5. **Rewards**: Winning battles rewards users with egg NFTs that contain attributes based on the defeated enemy Pokémon.

6. **In-Game Movement**: Users control their character's movement on the frontend to explore and encounter enemy Pokémon.

## Technologies Used

- Smart Contracts: Solidity
- Frontend: [Specify frontend technologies/frameworks]
- Blockchain: [Specify blockchain platform]
- Chainlink: CCIP, VRF

## How to Run

[Provide instructions for running the game locally or accessing it online.]


