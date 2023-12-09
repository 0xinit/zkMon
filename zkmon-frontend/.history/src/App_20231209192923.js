import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Battle from "./pages/Battle";
import PlayGame from "./pages/PlayGame";
import HomePage from "./pages/HomePage";
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
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [contractConfig, setContractConfig] = useState({
    locationContract: null,
    gameEngine: null,
  });
  const navigate = useNavigate();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState("");
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
        const addr = signer.getAddress();
        setAddress(addr);
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

  const checkConnections = async () => {
    await connectWallet();
    await requestLocationPermission();
  };

  useEffect(() => {
    if (window.ethereum) {
      checkConnections();
    } else {
      setShowConnectButton(true);
    }
  }, []);

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

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="px-8 md:px-16">
      <Navbar signer={(connectWallet, signer)} />
      <div>
        <Routes>
          <Route
            path="/"
            element={<HomePage checkConnections={checkConnections} />}
          />
          <Route path="/battle" element={<Battle />} />
          <Route path="/playgame" element={<PlayGame />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
