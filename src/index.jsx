import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const App = () => {
  return (
    <div className="container">
      <header>
        <div className="logo" />
        <h1>Sunrice and sunset</h1>
      </header>
    </div>
  );
};

createRoot(
  document.querySelector('#app'),
).render(<App />);
