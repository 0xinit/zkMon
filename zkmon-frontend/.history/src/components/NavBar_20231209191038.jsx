import React, { useState, useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = ({ signer, address }) => {
  const [isMenu, setIsMenu] = useState(false);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <div>
      {/* desktop */}
      <div className="hidden md:flex md:items-center md:justify-center">
        <ul className="flex gap-14 bg-cardBg p-4 md:mt-8 mt-4 rounded-full px-10">
          <Link to="/">
            <li className="cursor-pointer">Home</li>
          </Link>
          <p>
            <li className="cursor-pointer">{address}</li>
          </p>
        </ul>
      </div>

      {/* mobile */}
      <div
        className="flex md:hidden justify-end mt-6 text-3xl"
        onClick={handleMenu}
      >
        <BiMenuAltRight />
        {isMenu && (
          <div className="absolute top-14 text-base bg-cardBg py-2 px-4 rounded-lg z-50">
            <ul>
              <Link to="/">
                <li className="mt-1">Home</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
