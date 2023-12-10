import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonGame = ({ signer, contract }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const pokemonGameUrl =
    "https://6575056ac999e53eaf826ae4--cerulean-quokka-9ba2e1.netlify.app/";

  useEffect(() => {
    // Function to be invoked every 3 seconds
    const repeatedFunction = async () => {
      console.log(contract);
      if (contract && count < 1) {
        console.log(contract);
        await contract.updateRandomcon(
          "0x424a471A8381D805742e4A78ea36Bd43B8367623"
        );
        navigate("/battle");
        setCount(1);

        console.log("Function invoked every 3 seconds");
      }

      // Add your code here
    };

    // Set an interval to invoke the function every 3 seconds
    const intervalId = setInterval(repeatedFunction, 20000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [contract]); // Add "contract" to the dependency array if needed

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
