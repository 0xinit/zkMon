import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import your image
import backgroundImage from "../../assets/your-image-file.jpg";

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
    <div style={divStyle}>
      {/* Your button */}
      <button onClick={handleStartClick} variant="light">
        Press Start
      </button>
      {/* Rest of the component */}
    </div>
  );
};

export default Home;
