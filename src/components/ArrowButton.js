import React from 'react';
import arrowRight from '../images/arrow-right.png';

const ArrowButton = ({ direction, onClick, disabled }) => {
  const isLeft = direction === 'left';

  return (
    <img
      src={arrowRight}
      alt={`${direction} arrow`}
      className={`arrow ${isLeft ? 'arrow-left' : 'arrow-right'} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={onClick}
    />
  );
};

export default ArrowButton;
