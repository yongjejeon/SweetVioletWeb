import React, { useState } from 'react';

const Button = ({ label, onClick, variant = 'primary', disabled = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = {
    primary: {
      backgroundColor: '#5a5a5a',
      color: '#fff',
      padding: '15px 20px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px',
      margin: '20px auto',
      textAlign: 'center',
      fontSize: '18px',
      transition: 'transform 0.2s ease, background-color 0.2s ease',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Scale effect on hover
    },
    secondary: {
      backgroundColor: '#fff',
      color: '#333',
      padding: '15px 20px',
      cursor: 'pointer',
      border: '1px solid #333',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px',
      margin: '20px auto',
      textAlign: 'center',
      fontSize: '18px',
      transition: 'transform 0.2s ease, background-color 0.2s ease',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Scale effect on hover
    },
    disabled: {
      backgroundColor: '#ccc',
      color: '#666',
      padding: '15px 20px',
      cursor: 'not-allowed',
      border: 'none',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px',
      margin: '20px auto',
      textAlign: 'center',
      fontSize: '18px',
    },
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
      onMouseEnter={() => setIsHovered(true)} // Trigger hover effect
      onMouseLeave={() => setIsHovered(false)} // Reset on mouse leave
    >
      {label}
    </button>
  );
};

export default Button;
