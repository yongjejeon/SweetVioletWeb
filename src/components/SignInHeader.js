// src/components/SignInHeader.js
import React from 'react';
import './Header.css';

const SignInHeader = ({ title }) => {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default SignInHeader;
