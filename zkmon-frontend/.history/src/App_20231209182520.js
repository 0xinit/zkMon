import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Battle from "./pages/Battle";
import PlayGame from "./pages/PlayGame";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

const App = () => {
  const connectWallet = async () => {
    handleStartClick();
  };

  const connectContract = async (signer) => {
    // ... (implementation not provided)
  };
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

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="px-8 md:px-16">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/playgame" element={<PlayGame />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
