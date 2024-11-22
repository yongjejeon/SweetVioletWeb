import React from 'react';

const Button = ({ label, onClick, variant = 'primary', disabled = false }) => {
  const buttonStyles = {
    primary: {
      backgroundColor: '#5a5a5a',
      color: '#fff',
      padding: '15px 20px', // Increased padding for height
      cursor: 'pointer',
      border: 'none',
      borderRadius: '8px', // Rounded corners
      width: '100%', // Make button stretch to max width inside its container
      maxWidth: '400px', // Limit the max width of the button
      margin: '20px auto', // Center the button and give it some space above and below
      textAlign: 'center',
      fontSize: '18px', // Adjusted font size for balance
    },
    secondary: {
      backgroundColor: '#fff',
      color: '#333',
      padding: '15px 20px', // Increased padding for height
      cursor: 'pointer',
      border: '1px solid #333',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px', // Limit the max width of the button
      margin: '20px auto',
      textAlign: 'center',
      fontSize: '18px',
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
