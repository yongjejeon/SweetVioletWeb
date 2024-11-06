// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Input from '../components/Input';
import Button from '../components/Button';
import './Preferences.css';
import heightIcon from '../images/height-icon.png';
import weightIcon from '../images/weight-icon.png';

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
    <div className="preference-container">
      <h1 className="preference-title">Preferences</h1>
      <div className="selector">
        <Selector options={['Breakfast', 'Lunch', 'Dinner']} onSelect={setSelectedMeals} multiple={true} />
      </div>
      <div className="selector">
        <Selector options={['Maintain', 'Bulk', 'Cut']} onSelect={setSelectedGoal} multiple={false} />
      </div>
      <div className="input-container">
        <div className="input-item">
          <img src={heightIcon} alt="Height Icon" className="input-icon" />
          <Input label="Height" value={height} onChange={setHeight} placeholder="Enter your height" />
        </div>
        <div className="input-item">
          <img src={weightIcon} alt="Weight Icon" className="input-icon" />
          <Input label="Weight" value={weight} onChange={setWeight} placeholder="Enter your weight" />
        </div>
      </div>
      <Button className="button" label="Generate Meal Plan" onClick={handleGenerateMealPlan} disabled={!selectedGoal || selectedMeals.length === 0} />
    </div>
  );
};

export default Preferences;
