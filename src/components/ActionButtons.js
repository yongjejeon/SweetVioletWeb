// src/components/ActionButtons.js
import React from 'react';
import Button from './Button';

const ActionButtons = ({ buttons }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          label={button.label}
          onClick={button.onClick}
          variant={button.variant || 'primary'}
        />
      ))}
    </div>
  );
};

export default ActionButtons;
