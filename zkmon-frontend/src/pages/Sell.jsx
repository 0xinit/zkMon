import React, { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import fireImage1 from '../assets/PokeImages/enemy_pok1-removebg-preview.png';
import fireImage2 from '../assets/PokeImages/stone.png';
import fireImage3 from '../assets/PokeImages/pok2-removebg-preview.png';

const Sell = (isConnected, hasLocationPermission) => {
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
    const sellpokemons = [
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

    const mintNft = (id) => {
        setInputCardId(id);
    };

    const sellNFT = () => {
        alert('Sending NFTs...');
        // Add logic to handle sending NFTs with the specified amount
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-wrap justify-center">
                {sellpokemons.map((sellpokemon) => (
                    <div
                        key={sellpokemon.id}
                        className={`m-4 p-4 max-w-xs rounded-lg overflow-hidden shadow-lg ${inputCardId === sellpokemon.id ? 'border-2 border-purple-600' : ''
                            }`}
                    >
                        <img
                            src={sellpokemon.image}
                            alt={`${sellpokemon.name}-image`}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="flex justify-center mt-2">
                            {inputCardId === sellpokemon.id ? (
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
                                        onClick={sellNFT}
                                    >
                                        Send
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => mintNft(sellpokemon.id)}
                                >
                                    Buy for 100 USDC
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sell;
