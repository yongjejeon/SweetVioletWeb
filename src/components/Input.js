// src/components/Input.js
import React from 'react';

const Input = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ marginLeft: '10px', padding: '5px' }}
      />
    </div>
  );
};

export default Input;