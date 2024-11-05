// src/pages/Preferences.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Selector from '../components/Selector';
import Input from '../components/Input';
import Button from '../components/Button';

const Preferences = () => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const navigate = useNavigate();

  const handleGenerateMealPlan = () => {
    // Perform any form validation or data processing here
    navigate('/meal-plan'); // Navigate to the Meal Plan page
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Preferences</h2>
      <Selector options={['Breakfast', 'Lunch', 'Dinner']} onSelect={setSelectedMeals} multiple={true} />
      <Selector options={['Maintain', 'Bulk', 'Cut']} onSelect={setSelectedGoal} multiple={false} />
      <Input label="Weight" value={weight} onChange={setWeight} placeholder="Enter your weight" />
      <Input label="Height" value={height} onChange={setHeight} placeholder="Enter your height" />
      <Button label="Generate Meal Plan" onClick={handleGenerateMealPlan} />
    </div>
  );
};

export default Preferences;