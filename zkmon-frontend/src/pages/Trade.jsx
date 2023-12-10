import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import fireImage1 from '../assets/PokeImages/fire.png';
import fireImage2 from '../assets/PokeImages/poison.png';
import fireImage3 from '../assets/PokeImages/water.png';

const Trade = (isConnected, hasLocationPermission) => {

    const navigate = useNavigate();

    useEffect(() => {
        // Check if MetaMask is connected and location permission is granted
        if (!isConnected) {
            // Redirect to home page or any other page indicating connection is required
            navigate("/");
        } else if (!hasLocationPermission) {
            // Redirect to a page indicating location permission is required
            navigate("/");
        }
        // Additional logic specific to Sell component

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, hasLocationPermission]);
    const tradepokemons = [
        {
            id: 1,
            name: 'VulPix',
            image: fireImage1,
            // Other Pokemon details like HP, AS, DS, Type, etc.
        },
        {
            id: 2,
            name: 'AnotherPokemon',
            image: fireImage2,
            // Other Pokemon details like HP, AS, DS, Type, etc.
        },
        {
            id: 3,
            name: 'YetAnotherPokemon',
            image: fireImage3,
            // Other Pokemon details like HP, AS, DS, Type, etc.
        },
        // Add more Pokemon objects here if needed
    ];

    const [inputCardId, setInputCardId] = useState(null);
    const [amount, setAmount] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

    const mintTrade = (id) => {
        setInputCardId(id);
        setShowDropdown(true); // Show dropdown when a Pokemon is selected
    };

    const tradeNFT = () => {
        alert('Sending NFTs...');
        // Add logic to handle sending NFTs with the specified amount

        // After sending, reset the state and hide dropdown
        setInputCardId(null);
        setAmount('');
        setShowDropdown(false);
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-wrap justify-center">
                {tradepokemons.map((tradepokemon) => (
                    <div
                        key={tradepokemon.id}
                        className={`m-4 p-4 max-w-xs rounded-lg overflow-hidden shadow-lg ${inputCardId === tradepokemon.id ? 'border-2 border-purple-600' : ''}`}
                    >
                        <img
                            src={tradepokemon.image}
                            alt={`${tradepokemon.name}-image`}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="flex justify-center mt-2">
                            {inputCardId === tradepokemon.id ? (
                                <div className="flex items-center flex-col">
                                    {showDropdown && ( // Render dropdown if showDropdown is true
                                        <div className="mb-2">
                                            {/* Dropdown content here */}
                                            {/* Example dropdown */}
                                            <select
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="border rounded p-1"
                                            >
                                                <option value="Select">Select</option>
                                                <option value="Scroll">Scroll</option>
                                                <option value="Base">Base</option>
                                                <option value="Polygon">Polygon</option>
                                                <option value="Arbitrum">Arbitrum</option>
                                                {/* Add more options as needed */}
                                            </select>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Enter amount"
                                            className="border rounded p-1 mr-2"
                                            style={{ backgroundColor: '#F4F4F4' }}
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                        <button
                                            className="bg-purple-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={tradeNFT}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => mintTrade(tradepokemon.id)}
                                >
                                    Trade
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trade;
