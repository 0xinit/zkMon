import React from "react";

const PokemonGame = () => {
  const pokemonGameUrl =
    "https://6574f129458d3730574418f6--polite-klepon-a56338.netlify.app/";

  return (
    <div>
      <iframe
        title="Pokemon Game"
        src={pokemonGameUrl}
        width="100%"
        height="600px"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PokemonGame;
