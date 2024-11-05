// src/components/Button.js
import React from 'react';

const Button = ({ label, onClick, variant = 'primary', disabled = false }) => {
  const buttonStyles = {
    primary: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px 20px',
      cursor: 'pointer',
      border: 'none'
    },
    secondary: {
      backgroundColor: '#fff',
      color: '#333',
      padding: '10px 20px',
      cursor: 'pointer',
      border: '1px solid #333'
    }
  };

  return (
    <button
      onClick={onClick}
      style={variant === 'primary' ? buttonStyles.primary : buttonStyles.secondary}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;