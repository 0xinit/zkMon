import React from "react";

const TextBox = ({ messageOne, messageTwo }) => {
  return (
    <div className="battle-text-content">
      <p>
        {messageOne} <br /> {messageTwo}
      </p>
    </div>
  );
};

export default TextBox;
