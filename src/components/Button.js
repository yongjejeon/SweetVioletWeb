// src/components/Button.js
import React from 'react';

const Button = ({ label, onClick, variant = 'primary', disabled = false }) => {
  const buttonStyles = {
    primary: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px 20px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px', // Rounded corners
      width: '100%',
      maxWidth: '250px', // Limit button width for centering
      textAlign: 'center',
      marginTop: '30px',
      fontSize: '20px',
    },
    secondary: {
      backgroundColor: '#fff',
      color: '#333',
      padding: '10px 20px',
      cursor: 'pointer',
      border: '1px solid #333',
      borderRadius: '5px',
      width: '100%',
      maxWidth: '250px',
      textAlign: 'center',
      marginTop: '30px',
      fontSize: '20px',
    },
    disabled: {
      backgroundColor: '#ccc',
      color: '#666',
      padding: '10px 20px',
      cursor: 'not-allowed',
      border: 'none',
      borderRadius: '5px',
      width: '100%',
      maxWidth: '250px',
      textAlign: 'center',
      marginTop: '30px',
      fontSize: '20px',
    }
  };

  return (
    <button
      onClick={onClick}
      style={
        disabled
          ? buttonStyles.disabled
          : variant === 'primary'
          ? buttonStyles.primary
          : buttonStyles.secondary
      }
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
