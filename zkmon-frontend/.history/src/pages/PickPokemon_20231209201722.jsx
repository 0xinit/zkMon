import React from "react";
import { Link } from "react-router-dom";

const PickPokemon = ({}) => {
  return (
    <div className="w-full bg-[#fff]">
      <div className="p-9 h-full">
        <p
          className="text-[1.8rem] font-semibold"
          style={{ marginBottom: "1.5rem" }}
        >
          <span className="text-lightPrimary">Recent</span> Posts
        </p>

        <div className="h-full w-full grid md:grid-cols-4 gap-6 my-6 md:px-16">
          <div
            key=""
            className="md:w-300 p-8 min-w-260 bg-lightCard backdrop-blur-md rounded-3xl flex flex-col justify-center drop-shadow-lg gap-4 hover:scale-105 transition-all duration-300"
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
                  post.company
                </p>
                <p className="md:text-[0.7rem] text-[0.6rem] text-lighttextGray">
                  post.location
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold">post.jobTitle</p>
              <p className="text-[0.7rem] text-lighttextGray">
                post.employmentType
              </p>
            </div>
            <p className="text-[0.7rem] text-justify font-medium">
              post.description
            </p>
            <div className="flex justify-between pb-4 gap-3">
              <p className="text-[0.7rem] text-lighttextGray">
                <span className="text-xl font-bold text-lightModeTextColor">
                  post.salary
                </span>
              </p>

              <div
                className="md:text-[0.9rem] text-[0.7rem] rounded-lg bg-lightBgBlue py-2 px-5 text-lightPrimary font-medium hover:shadow-lg duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => {}}
              >
                Enroll Now
              </div>
            </div>
          </div>
        </div>
        <p className="md:text-[lg] text-sm text-right text-lightPrimary cursor-pointer hover:text-lightModeTextColor">
          View all
        </p>
      </div>
    </div>
  );
};

export default PickPokemon;
