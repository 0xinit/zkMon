import React, { useEffect, useState } from "react";
import Navbar from "./comp/Navbar";
import { Route, Routes } from "react-router-dom";
import Battle from "./pages/Battle";
import PlayGame from "./pages/PlayGame";
import HomePage from "./pages/HomePage";
import Footer from "./comp/Footer";

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
          <Route path="/playgame" element={<RepayLoan />} />
          <Route path="/Battle" element={<LiquidateNFT />} />
        </Routes>
        {false ? (
          <div>
            <button
              className="md:ml-10 font-semibold bg-primaryColor p-4 px-8 text-backgroundColor rounded-lg mt-8"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
            <p>
              If you don't have MetaMask installed, you can{" "}
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                target="_blank"
                rel="noopener noreferrer"
              >
                install it from the Chrome Web Store
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default App;
