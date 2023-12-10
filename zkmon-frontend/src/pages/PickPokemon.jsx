import React from "react";
import fireImage from "../assets/PokeImages/fire.png";
import waterImage from "../assets/PokeImages/water.png";
import stoneImage from "../assets/PokeImages/stone.png";
import ghostImage from "../assets/PokeImages/ghost.png";
import windImage from "../assets/PokeImages/wind.png";
import { useNavigate } from "react-router-dom";

const PickPokemon = ({ signer, contractConfig, userLocation }) => {
  const navigate = useNavigate();


  const pokemons = [
    {
      id: 1,
      name: 'VulPix',
      images: [fireImage1, fireImage2, fireImage3],
      // Other Pokemon details like HP, AS, DS, Type, etc.
    },
    // Other Pokemon objects with their respective image arrays
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000, // Adjust speed in milliseconds
    autoplay: true,
    autoplaySpeed: 3000, // Interval between slides in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const mintNft = async ([num1, num2, num3]) => {
    try {
      if (!contractConfig) {
        throw new Error("Game engine contract not available.");
      }

      const value = await contractConfig.mintNFT(
        num1,
        num2,
        num3,
        userLocation[0] * 10000000,
        userLocation[1] * 10000000
      );

      if (value) {
        alert("Minted pokemons and you are in venue. Start the game!");
        navigate("/playgame");
      } else {
        alert("Transaction failed. Please check your gas settings.");
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error minting NFT. Please check console for details.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="p-9 h-full">
        {/* Loop through pokemons and create card for each */}
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="md:w-300 p-8 min-w-260 rounded-3xl flex flex-col gap-6 hover:scale-105 transition-all duration-300"
            style={{
              backgroundColor: 'white'
            }}
          >
            <div className="relative h-40 md:h-52">
              <Slider {...settings}>
                {pokemon.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="w-full">
                    <img
                      src={image}
                      alt={`${pokemon.name}-${imgIndex}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            {/* Button at the bottom */}
            <div div className="flex justify-center mt-12" >
              <button className="bg-purple-600 text-black  font-bold py-2 px-4 rounded" style={{ color: '#fff', backgroundColor: '#7E57C2' }}  onClick={() => mintNft([1, 2, 3])}>
                Mint
              </button>
            </div>
          ))}
        </div>

        <div
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-32 h-15"
          onClick={() => mintNft([1, 2, 3])}
        >
          Mint NFT
        </div>

        <p className="md:text-[lg] text-sm text-center text-primaryColor cursor-pointer hover:text-lightModeTextColor">
          You will get a random set of 3 Pokémon from this selection.
        </p>

      </div>
    </div>
  );
};

export default PickPokemon;
