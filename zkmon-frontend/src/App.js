import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Battle from "./pages/Battle";
import PlayGame from "./pages/PlayGame";
import HomePage from "./pages/HomePage";
import PickPokemon from "./pages/PickPokemon";
import Sell from "./pages/Sell";
import Trade from "./pages/Trade.jsx";
import Footer from "./components/Footer";
import {
  contractAddressOfProofOfLocation,
  contractAbiOfProofOfLocation,
  contractAddressOfGameEngine,
  contractAbiOfGameEngine,
} from "./contractConfig.js";

import { useNavigate } from "react-router-dom";
const { ethers } = require("ethers");

const App = () => {
  const location = useLocation();
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [contractConfig, setContractConfig] = useState({
    locationContract: null,
    gameEngine: null,
  });
  const navigate = useNavigate();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState([]);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
        await connectContract(signer);
      } catch (error) {
        console.error(error);
        setShowConnectButton(true);
      }
    } else {
      setShowConnectButton(true);
    }
  };

  const connectContract = async (signer) => {
    const proofOfLocationContract = await new ethers.Contract(
      contractAddressOfProofOfLocation,
      contractAbiOfProofOfLocation,
      signer
    );

    const gameEngineContract = await new ethers.Contract(
      contractAddressOfGameEngine,
      contractAbiOfGameEngine,
      signer
    );

    setContractConfig({
      locationContract: proofOfLocationContract,
      gameEngine: gameEngineContract,
    });
  };

  // const proceeedGame = async () => {
  //   navigate("/pickPokemons");
  // };
  // const checkConnections = async () => {
  //   await connectWallet();
  //   await requestLocationPermission();
  //   console.log(userLocation[0] * 10000000);
  //   console.log(userLocation[1] * 10000000);
  // };
  const checkConnections = async () => {
    if (window.ethereum) {
        await connectWallet();
        await requestLocationPermission();
    } else {
      // MetaMask not found
      setShowConnectButton(true);
    }
  };

  // useEffect(() => {
    // if (window.ethereum) {
    //   checkConnections();
    // } else {
    //   setShowConnectButton(true);
    // }
  // }, []);

  const requestLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setHasLocationPermission(true);
          navigate('/pickPokemons'); // Navigate to the full map page after permission is granted
        },
        (error) => {
          console.error("Error getting user location:", error);
          setHasLocationPermission(false);
          alert("Please allow location access to play the game");
        }
      );
    } else {
    }
  };

  useEffect(() => {
    // connectWallet();
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      // Cleanup: remove the event listener
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask disconnected
      // setIsMetaMaskConnected(false);
      setHasLocationPermission(false);
      navigate('/'); // Navigate to the full map page after permission is granted
    }
  };
  return (
    <div className="px-8 md:px-16">
      player
      {location.pathname !== "/playgame" && (
        <Navbar signer={(connectWallet, signer, address)} />
      )}
      <div>
        <Routes>
          <Route
            path="/"
            element={<HomePage checkConnections={checkConnections} />}
          />
          <Route path="/battle" element={<Battle />} />
          <Route path="/playgame" element={<PlayGame />} />
          {/* <Route path="/sell" element={<Sell />} />
          <Route path="/trade" element={<Trade />} /> */}
          <Route
            path="/sell"
            element={<Sell isConnected={!!signer} hasLocationPermission={hasLocationPermission} />}
          />
          <Route
            path="/trade"
            element={<Trade isConnected={!!signer} hasLocationPermission={hasLocationPermission} />}

          />
          <Route
            path="/pickPokemons"
            element={
              <PickPokemon
                signer={signer}
                contractConfig={contractConfig.gameEngine}
                userLocation={userLocation}
              />
            }
          />
        </Routes>
        {location.pathname !== "/playgame" && <Footer />}
      </div>
    </div>
  );
};

export default App;
