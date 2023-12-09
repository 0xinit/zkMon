import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
// Import your image
import backgroundImage from "../assets/bg.png";
import { Link } from "react-router-dom";
import pokeball from "../assets/pokeball.json";
import { useNavigate } from "react";

const Home = ({ checkConnections, signer }) => {
  const navigate = useNavigate();
  const checkAndPass = async () => {
    if (signer) {
      checkConnections();
    } else {
      proceeedGame();
    }
  };
  const proceeedGame = async () => {
    navigate("/pickPokemons");
  };

  return (
    <div className="md:grid md:grid-flow-col md:gap-16 md:mt-20 justify-center">
      <div className="md:hidden flex col-span-2 text-center md:text-left mt-6 md:mt-0 text-[3.5rem] md:text-[9.5rem] font-extrabold leading-tight">
        Start Making Money With NFT's
      </div>

      <div className="row-span-3 flex flex-col -mt-10">
        <Lottie animationData={pokeball} />

        <p className=" opacity-75 md:pl-10 text-center md:text-left text-sm"></p>
        <button
          className=" w-[87%] md:ml-10 font-semibold bg-primaryColor p-4 px-8 text-backgroundColor rounded-lg mt-8"
          onClick={checkAndPass}
        >
          Start Game
        </button>
      </div>

      <div className="hidden md:flex col-span-2 text-center md:text-left mt-6 md:mt-0 text-[3.5rem] md:text-[8.5rem] font-extrabold leading-tight">
        Onchain ZKMon
      </div>
      {/* <div class="row-span-2 col-span-2">03</div> */}
    </div>
  );
};

export default Home;
