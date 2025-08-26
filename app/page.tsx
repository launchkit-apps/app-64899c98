import React from 'react';
import MovieDrinkingGame from '../components/MovieDrinkingGame';

export default function Home() {
  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <MovieDrinkingGame />
    </div>
  );
}