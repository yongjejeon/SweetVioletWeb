// src/components/ArrowButton.js
import React from 'react';
import arrowRight from '../images/arrow-right.png';

const ArrowButton = ({ direction, onClick, disabled }) => {
  const isLeft = direction === 'left';

  return (
    <img
      src={arrowRight}
      alt={`${direction} arrow`}
      className={`arrow ${isLeft ? 'arrow-left' : 'arrow-right'}`}
      onClick={onClick}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transform: isLeft ? 'scaleX(-1)' : 'none',
      }}
    />
  );
};

export default ArrowButton;
