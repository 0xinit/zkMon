import React from "react";
import fireImage from "../assets/PokeImages/fire.png";
import waterImage from "../assets/PokeImages/water.png";
import stoneImage from "../assets/PokeImages/stone.png";
import ghostImage from "../assets/PokeImages/ghost.png";
import windImage from "../assets/PokeImages/wind.png";

const PickPokemon = ([{ contractConfig }]) => {
  const pokemons = [
    {
      id: 1,
      name: "VulPix",
      HP: 100,
      AS: 100,
      DS: 100,
      Type: "fire",
      url: fireImage,
      ipfs_uri: "",
    },
    {
      id: 2,
      name: "Suirtle",
      HP: 100,
      AS: 100,
      DS: 100,
      Type: "water",
      url: waterImage,
      ipfs_uri: "",
    },
    {
      id: 3,
      name: "VulPix",
      HP: 100,
      AS: 100,
      DS: 100,
      Type: "Stone",
      url: stoneImage,
      ipfs_uri: "",
    },
    {
      id: 4,
      name: "VulPix",
      HP: 100,
      AS: 100,
      DS: 100,
      Type: "fire",
      url: ghostImage,
      ipfs_uri: "",
    },
    {
      id: 5,
      name: "VulPix",
      HP: 100,
      AS: 100,
      DS: 100,
      Type: "fire",
      url: windImage,
      ipfs_uri: "",
    },
  ];

  const mintNft = async () => {};

  return (
    <div className="w-full">
      <div className="p-9 h-full">
        <p
          className="text-[1.8rem] font-semibold text-primaryColor"
          style={{ marginBottom: "1.5rem" }}
        >
          <span className="text-lightPrimary">Mint</span> Pokemon
        </p>

        <div className="h-full w-full grid md:grid-cols-4 gap-6 my-6 md:px-16">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="md:w-300 p-8 min-w-260 bg-cardBg backdrop-blur-md rounded-3xl flex flex-col justify-center drop-shadow-lg gap-4 hover:scale-105 transition-all duration-300"
            >
              <div className="flex">
                <img
                  src={pokemon.url}
                  alt={pokemon.name}
                  className="w-9 h-9 md:w-12 md:h-12 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                />
                <div className="mx-3">
                  <p className="md:text-[1rem] text-[0.8rem] font-medium hover:text-lightPrimary hover:underline">
                    {pokemon.name}
                  </p>
                  <p className="md:text-[0.7rem] text-[0.6rem] text-lighttextGray">
                    {pokemon.Type}
                  </p>
                </div>
              </div>
              <p className="text-[0.7rem] text-justify font-medium">
                Defense Value: {pokemon.DS}
              </p>
              <p className="text-[0.7rem] text-justify font-medium">
                Attack Value: {pokemon.AS}
              </p>
              <p className="text-[0.7rem] text-justify font-medium">
                Health Points: {pokemon.HP}
              </p>
              <div className="flex justify-between pb-4 gap-3">
                <div
                  className="md:text-[0.9rem] text-[0.7rem] rounded-lg bg-primaryColor py-2 px-5 text-cardBg font-medium hover:shadow-lg duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={mintNft(pokemon.id)}
                >
                  Mint NFT
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="md:text-[lg] text-sm text-right text-primaryColor cursor-pointer hover:text-lightModeTextColor">
          View all
        </p>
      </div>
    </div>
  );
};

export default PickPokemon;
