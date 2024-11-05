// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Input from '../components/Input';
import Button from '../components/Button';

const Preferences = () => {
  const {
    selectedMeals,
    setSelectedMeals,
    selectedGoal,
    setSelectedGoal,
    weight,
    setWeight,
    height,
    setHeight,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const handleGenerateMealPlan = () => {
    navigate('/meal-plan');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Preferences</h2>
      <Selector options={['Breakfast', 'Lunch', 'Dinner']} onSelect={setSelectedMeals} multiple={true} />
      <Selector options={['Maintain', 'Bulk', 'Cut']} onSelect={setSelectedGoal} multiple={false} />
      <Input label="Weight" value={weight} onChange={setWeight} placeholder="Enter your weight" />
      <Input label="Height" value={height} onChange={setHeight} placeholder="Enter your height" />
      <Button label="Generate Meal Plan" onClick={handleGenerateMealPlan} disabled={!selectedGoal || selectedMeals.length === 0} /> {/*Added a disabled component(the user must select goal and atleast one meal) */}
    </div>
  );
};

export default Preferences;
