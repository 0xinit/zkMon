import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import fireImage1 from '../assets/PokeImages/ghost.png';
import fireImage2 from '../assets/PokeImages/water.png';
import fireImage3 from '../assets/PokeImages/wind.png';

const PickPokemon = () => {
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
    /*const value = await contractConfig.gameEngine(
      num1,
      num2,
      num3,
      userLocation[0],
      userLocation[1]
    );
    */
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
          </div>
           
        ))}
      </div>
    </div>
  );
};

export default PickPokemon;
