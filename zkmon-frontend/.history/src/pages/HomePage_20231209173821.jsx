import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/bg.png";

const HomePage = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // Adjust as needed
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#8FFF6A", // Replace with your preferred color
    color: "#111112", // Replace with your preferred color
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <div style={backgroundImageStyle}>
      <h1 style={{ color: "#fff" }}>Welcome to Your Website</h1>
      <p style={{ color: "#fff" }}>Explore and enjoy our content</p>
      <Link to="/">
        <button style={buttonStyle}>Get Started</button>
      </Link>
    </div>
  );
};

export default HomePage;
