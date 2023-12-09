import React from "react";

const GameOver = ({ loser, winner }) => {
  return (
    <div className="battle-text-content d-flex justify-content-between">
      <p>
        {`${loser} fainted.`}
        <br /> {`${winner} wins!`}
      </p>
    </div>
  );
};

export default GameOver;
