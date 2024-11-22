import React from 'react';

const Input = ({ label, value, onChange, placeholder, type, max }) => {
  const handleChange = (e) => {
    let newValue = e.target.value;

    // If the new value exceeds the max value, set it to the max value
    if (type === 'number' && newValue > max) {
      newValue = max;
    }

    // Only update if the new value is a valid number or empty (for number type)
    if (newValue === '' || (!isNaN(newValue) && type === 'number') || type === 'text') {
      onChange(newValue);
    }
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <label
        style={{
          fontSize: '18px',
          textAlign: 'center',
          display: 'block',
          marginBottom: '10px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          color: '#696cbc',
        }}
      >
        {label}
      </label>
      <input
        type={type} // Dynamically set the type (number, text, etc.)
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '18px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontFamily: 'Roboto, sans-serif',
          textAlign: 'center',
          marginTop: '5px',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        max={type === 'number' ? max : undefined} // Only apply max for number type
      />
    </div>
  );
};

export default Input;
