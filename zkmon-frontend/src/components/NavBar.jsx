import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = ({ connectwallet, signer, address }) => {
  const [isMenu, setIsMenu] = useState(false);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <div>
      {/* desktop */}
      <div className="hidden md:flex md:items-center md:justify-end">
        <ul className="flex gap-14 bg-cardBg md:mt-8 mt-4 px-10" style={{
          backgroundColor: '#7E57C2',
          borderRadius: '10px',
          padding: '0.95rem'
        }}>
          <Link to="/" style={{ color: 'white' }}>
            <li className="cursor-pointer">Home</li>
          </Link>
          <Link to="/sell" style={{ color: 'white' }}>
            <li className="cursor-pointer">Sell</li>
          </Link>
          <Link to="/trade" style={{ color: 'white' }}>
            <li className="cursor-pointer">Trade</li>
          </Link>
        </ul>
      </div>

      {/* mobile */}
      <div className="flex md:hidden justify-end mt-6 text-3xl" onClick={handleMenu}>
        <BiMenuAltRight />
        {isMenu && (
          <div className="absolute top-14 text-base bg-cardBg py-2 px-4 rounded-lg z-50">
            <ul>
              <Link to="/">
                <li className="mt-1">Home</li>
              </Link>
              <Link to="/sell">
                <li className="mt-1">Sell</li>
              </Link>
              <Link to="/trade">
                <li className="mt-1">Trade</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
