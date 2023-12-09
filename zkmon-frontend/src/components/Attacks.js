import React from "react";

const Attacks = ({ details, handleAttackClick }) => {
  const { name, damage } = details;

  return (
    <div className="attack-container">
      <div>
        <span
          className="move-pointer"
          onClick={() => handleAttackClick(name, damage)}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

export default Attacks;
