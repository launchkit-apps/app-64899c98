"use client";

import React, { useState, useEffect } from 'react';

export default function MovieDrinkingGame() {
  const [isListening, setIsListening] = useState(false);
  const [currentMovie, setCurrentMovie] = useState('');
  const [drinkCount, setDrinkCount] = useState(0);
  const [lastTrigger, setLastTrigger] = useState('');

  // Mock rules - in real app would be more generic/dynamic
  const genericRules = [
    "Someone says the main character's name",
    "A chase scene occurs",
    "Someone drops something",
    "A door slams",
    "Someone says 'Wait!'",
  ];

  // Simulate a drink trigger (in real app would be from audio recognition)
  const triggerDrink = (reason: string) => {
    setDrinkCount(prev => prev + 1);
    setLastTrigger(reason);
    
    // Flash effect
    const gameArea = document.getElementById('gameArea');
    if (gameArea) {
      gameArea.classList.add('flash');
      setTimeout(() => gameArea.classList.remove('flash'), 500);
    }

    // Play sound
    const audio = new Audio('/drink-alert.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here we would initialize audio listening
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div 
        id="gameArea"
        className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
        style={{
          transition: 'background-color 0.2s',
        }}
      >
        <h1 className="text-2xl font-bold mb-4">Movie Drinking Game</h1>
        
        <div className="mb-6">
          <button
            onClick={toggleListening}
            className={`w-full py-3 rounded-lg text-lg font-bold ${
              isListening ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>
        </div>

        {isListening && (
          <>
            <div className="mb-4">
              <h2 className="text-xl mb-2">Current Rules:</h2>
              <ul className="list-disc pl-5">
                {genericRules.map((rule, index) => (
                  <li key={index} className="mb-1">{rule}</li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold">Drinks: {drinkCount}</p>
              {lastTrigger && (
                <p className="mt-2 text-yellow-400">Last trigger: {lastTrigger}</p>
              )}
            </div>
          </>
        )}

        <div className="mt-6 text-sm text-gray-400">
          <p>Please drink responsibly. Take water breaks and know your limits.</p>
        </div>
      </div>

      <style jsx>{`
        .flash {
          animation: flashAnimation 0.5s;
        }

        @keyframes flashAnimation {
          0% { background-color: rgb(31, 41, 55); }
          50% { background-color: rgb(220, 38, 38); }
          100% { background-color: rgb(31, 41, 55); }
        }
      `}</style>
    </div>
  );
}