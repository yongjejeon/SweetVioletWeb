import React, { useState } from 'react';

const Selector = ({ options, onSelect, multiple = false }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    let updatedSelection;
    if (multiple) {
      if (selectedOptions.includes(option)) {
        updatedSelection = selectedOptions.filter((item) => item !== option);
      } else {
        updatedSelection = [...selectedOptions, option];
      }
    } else {
      updatedSelection = selectedOptions[0] === option ? [] : [option];
    }
    setSelectedOptions(updatedSelection);
    onSelect(multiple ? updatedSelection : updatedSelection[0]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleSelect(option)}
          style={{
            padding: '10px 15px',
            margin: '5px',
            backgroundColor: selectedOptions.includes(option) ? '#333' : '#f0f4f3',
            color: selectedOptions.includes(option) ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '20px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            transform: selectedOptions.includes(option) ? 'scale(1.1)' : 'scale(1)', // Slightly enlarge selected
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = selectedOptions.includes(option) ? 'scale(1.1)' : 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Selector;
