import React from "react";

const PlayAgain = ({ handlePlayAgain }) => {
  return (
    <div className="battle-text-content">
      <p id="play-again-text" onClick={handlePlayAgain}>
        Click Here To Play Again
      </p>
    </div>
  );
};

export default PlayAgain;
