// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <h1>Sweet Violet</h1>
      <nav>
        <a href="#meal-plan">Meal Plan</a> | <a href="#preferences">Preferences</a>
      </nav>
    </header>
  );
};

export default Header;