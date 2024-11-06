// src/components/Input.js
import React from 'react';

const Input = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <label style={{ fontSize: '20px', textAlign: 'center', display: 'block', marginTop: '10px' }}>
  {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ marginLeft: '10px', padding: '5px', fontSize: '25px', marginTop: '10px'}}
      />
    </div>
  );
};

export default Input;