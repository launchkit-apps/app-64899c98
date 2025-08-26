"use client";

import React, { useState, useEffect } from 'react';

export default function MovieDrinkingGame() {
  const [isListening, setIsListening] = useState(false);
  const [currentMovie, setCurrentMovie] = useState('');
  const [drinkCount, setDrinkCount] = useState(0);
  const [lastTrigger, setLastTrigger] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');

  const movieRules = {
    "The Big Lebowski": [
      "The Dude says 'man'",
      "Anyone drinks a White Russian",
      "Someone says 'dude'",
      "The rug is mentioned",
      "Walter says 'Vietnam'"
    ],
    "Lord of the Rings": [
      "Frodo puts on the ring",
      "Someone says 'precious'",
      "Gandalf uses magic",
      "An Orc dies",
      "Sam shows devotion to Frodo"
    ],
    "Harry Potter": [
      "Someone says 'Muggle'",
      "A spell is cast",
      "Hermione corrects someone",
      "Snape looks suspicious",
      "Harry's scar hurts"
    ]
  };

  const triggerDrink = (reason: string) => {
    setDrinkCount(prev => prev + 1);
    setLastTrigger(reason);
    
    const gameArea = document.getElementById('gameArea');
    if (gameArea) {
      gameArea.classList.add('flash');
      setTimeout(() => gameArea.classList.remove('flash'), 500);
    }

    const audio = new Audio('/drink-alert.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const handleRuleClick = (rule: string) => {
    if (isListening) {
      triggerDrink(rule);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
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
          <select 
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
          >
            <option value="">Select a movie</option>
            {Object.keys(movieRules).map((movie) => (
              <option key={movie} value={movie}>{movie}</option>
            ))}
          </select>

          <button
            onClick={toggleListening}
            disabled={!selectedMovie}
            className={`w-full py-3 rounded-lg text-lg font-bold ${
              !selectedMovie ? 'bg-gray-500' :
              isListening ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {!selectedMovie ? 'Select a movie to start' :
             isListening ? 'Stop Game' : 'Start Game'}
          </button>
        </div>

        {isListening && selectedMovie && (
          <>
            <div className="mb-4">
              <h2 className="text-xl mb-2">Click when these happen:</h2>
              <ul className="list-disc pl-5">
                {movieRules[selectedMovie as keyof typeof movieRules].map((rule, index) => (
                  <li 
                    key={index} 
                    className="mb-1 cursor-pointer hover:text-yellow-400"
                    onClick={() => handleRuleClick(rule)}
                  >
                    {rule}
                  </li>
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