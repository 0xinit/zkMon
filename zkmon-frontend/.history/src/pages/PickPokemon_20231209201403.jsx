import React from "react";
import { Link } from "react-router-dom";

const PickPokemon = ({}) => {
  return (
    <div>
      <div className="hidden md:flex lg:gap-10 md:gap-2 items-center justify-center rounded-2xl border px-16 py-6 ml-auto mb-4">
        <div className="flex flex-col">
          <h5 className="text-xl font-bold">jobTitle</h5>
          <div className="flex ">
            {/* <LocationOnIcon className="text-lighttextGray text-lg mr-1" /> */}
            <p className="text-sm text-lighttextGray">location</p>
          </div>
        </div>
        <p className="text-sm mb-2">category</p>
        <p className="text-base">
          Description: description.split(" ").slice(0, 15).join(" ") + "..."
        </p>
        <div className="flex justify-end mt-4">
          <div className="flex items-center justify-center">
            <p className="font-bold text-2xl ">salary</p>
            <p className="text-lighttextGray">/Year</p>
          </div>
          <Link to="/job/${id}">
            <button
              className="bg-lightPrimary text-lightCard md:px-7 ml-4 px-2 py-2   text-sm rounded-lg"
              type="submit"
            >
              More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PickPokemon;
