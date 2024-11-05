// src/components/Selector.js
import React, { useState } from 'react';

const Selector = ({ options, onSelect, multiple = false }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    let updatedSelection;
    if (multiple) {
      // Handle multiple selections
      if (selectedOptions.includes(option)) {
        updatedSelection = selectedOptions.filter((item) => item !== option);
      } else {
        updatedSelection = [...selectedOptions, option];
      }
    } else {
      // Handle single selection
      updatedSelection = selectedOptions[0] === option ? [] : [option];
    }
    setSelectedOptions(updatedSelection);
    onSelect(multiple ? updatedSelection : updatedSelection[0]);
  };

  return (
    <div>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleSelect(option)}
          style={{
            padding: '10px',
            margin: '5px',
            backgroundColor: selectedOptions.includes(option) ? '#333' : '#ccc',
            color: selectedOptions.includes(option) ? '#fff' : '#000',
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Selector;