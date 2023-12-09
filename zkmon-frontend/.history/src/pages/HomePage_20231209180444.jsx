import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
// Import your image
import backgroundImage from "../assets/bg.png";
import { Link } from "react-router-dom";
import heroAnimation from "../assets/heroAnimation.json";

const Home = () => {
  const navigate = useNavigate();
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    checkMetaMaskConnection();
    // Listen for MetaMask account changes
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      // Cleanup: remove the event listener
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const checkMetaMaskConnection = () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setIsMetaMaskConnected(true);
    } else {
      setIsMetaMaskConnected(false);
    }
  };

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsMetaMaskConnected(true);
      } catch (error) {
        setIsMetaMaskConnected(false);
      }
    } else {
    }
  };

  const requestLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setHasLocationPermission(true);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setHasLocationPermission(false);
        }
      );
    } else {
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask disconnected
      setIsMetaMaskConnected(false);
      setHasLocationPermission(false);
    } else {
      // MetaMask connected
      setIsMetaMaskConnected(true);
    }
  };

  const handleStartClick = () => {
    if (isMetaMaskConnected) {
      requestLocationPermission();
    } else {
      connectToMetaMask();
    }
  };

  // Style for the div
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="md:grid md:grid-flow-col md:gap-16 md:mt-20 justify-center">
      <div className="md:hidden flex col-span-2 text-center md:text-left mt-6 md:mt-0 text-[3.5rem] md:text-[9.5rem] font-extrabold leading-tight">
        Start Making Money With NFT's
      </div>

      <div className="row-span-3 flex flex-col -mt-10">
        <Lottie animationData={heroAnimation} />

        <p className=" opacity-75 md:pl-10 text-center md:text-left text-sm">
          GM GM GM GM !
        </p>
        <Link to="/takeLoan">
          <button
            className=" w-[87%] md:ml-10 font-semibold bg-primaryColor p-4 px-8 text-backgroundColor rounded-lg mt-8"
            onClick={handleStartClick}
          >
            Start Game
          </button>
        </Link>
      </div>

      <div className="hidden md:flex col-span-2 text-center md:text-left mt-6 md:mt-0 text-[3.5rem] md:text-[8.5rem] font-extrabold leading-tight">
        ZKmON
      </div>
      {/* <div class="row-span-2 col-span-2">03</div> */}
    </div>
  );
};

export default Home;
