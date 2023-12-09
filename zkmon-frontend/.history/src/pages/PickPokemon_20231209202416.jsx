import React from "react";
import { Link } from "react-router-dom";

const PickPokemon = ({}) => {
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
          <div
            key=""
            className="md:w-300 p-8 min-w-260 bg-cardBg backdrop-blur-md rounded-3xl flex flex-col justify-center drop-shadow-lg gap-4 hover:scale-105 transition-all duration-300"
          >
            {/*<img src="frontend/src/img/free_img.png" alt="corner-image" className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 object-cover"/>*/}

            <div className="flex">
              <img
                src=""
                alt="logo"
                className="w-9 h-9 md:w-12 md:h-12 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              />
              <div className="mx-3">
                <p className="md:text-[1rem] text-[0.8rem] font-medium hover:text-lightPrimary hover:underline">
                  Pokemon Name
                </p>
                <p className="md:text-[0.7rem] text-[0.6rem] text-lighttextGray">
                  Pokemon Type
                </p>
              </div>
            </div>
            <p className="text-[0.7rem] text-justify font-medium">
              Defense Value
            </p>
            <div className="flex justify-between pb-4 gap-3">
              <div
                className="md:text-[0.9rem] text-[0.7rem] rounded-lg bg-primaryColor py-2 px-5 text-cardBg font-medium hover:shadow-lg duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => {}}
              >
                Enroll Now
              </div>
            </div>
          </div>
        </div>
        <p className="md:text-[lg] text-sm text-right text-primaryColor cursor-pointer hover:text-lightModeTextColor">
          View all
        </p>
      </div>
    </div>
  );
};

export default PickPokemon;
