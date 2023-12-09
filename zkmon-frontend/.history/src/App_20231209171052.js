import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Battle from "./pages/Battle";
import PlayGame from "./pages/PlayGame";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

const App = () => {
  const connectWallet = async () => {
    // ... (implementation not provided)
  };

  const connectContract = async (signer) => {
    // ... (implementation not provided)
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
