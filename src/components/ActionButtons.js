// src/components/ActionButtons.js
import React from 'react';
import Button from './Button';

const ActionButtons = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button label="Select Meal Plan without Ordering" onClick={() => console.log('Select without ordering')} variant="primary" />
      <Button label="Order Meal Plan" onClick={() => console.log('Order meal plan')} variant="primary" />
      <Button label="Regenerate" onClick={() => console.log('Regenerate meal plan')} variant="primary" />
    </div>
  );
};

export default ActionButtons;
