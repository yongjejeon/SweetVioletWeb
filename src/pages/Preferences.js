// src/pages/Preferences.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import weightIcon from '../images/weight-icon.png';
import heightIcon from '../images/height-icon.png';

const Preferences = () => {
  const navigate = useNavigate();
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleGenerateMealPlan = () => {
    // Perform any form validation or data processing here if needed
    navigate('/meal-plan'); // Redirect to the Meal Plan page
  };

  const handleMealSelection = (meal) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#d0d0d0', height: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Preferences</h2>

      {/* Meal Type Selection */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
          <button
            key={meal}
            onClick={() => handleMealSelection(meal)}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              backgroundColor: selectedMeals.includes(meal) ? '#888' : '#ccc',
              color: selectedMeals.includes(meal) ? '#fff' : '#000',
              border: '1px solid #888',
              cursor: 'pointer',
            }}
          >
            {meal}
          </button>
        ))}
      </div>

      {/* Dietary Restrictions Input */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p>What are your Dietary Restrictions?</p>
        <input
          type="text"
          placeholder="List of Tags we have, Searchable and Added as a list"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
          style={{
            width: '60%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #888',
          }}
        />
      </div>

      {/* Goal Selection */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {['Maintain', 'Bulk', 'Cut'].map((goal) => (
          <button
            key={goal}
            onClick={() => setSelectedGoal(goal)}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              backgroundColor: selectedGoal === goal ? '#888' : '#ccc',
              color: selectedGoal === goal ? '#fff' : '#000',
              border: '1px solid #888',
              cursor: 'pointer',
            }}
          >
            {goal}
          </button>
        ))}
      </div>

      {/* Weight and Height Input */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', marginRight: '20px' }}>
          <img src={weightIcon} alt="Weight Icon" style={{ marginBottom: '10px' }} />
          <p>Enter your weight</p>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Value"
            style={{
              width: '80px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #888',
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src={heightIcon} alt="Height Icon" style={{ marginBottom: '10px' }} />
          <p>Enter your height</p>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Value"
            style={{
              width: '80px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #888',
            }}
          />
        </div>
      </div>

      {/* Generate Meal Plan Button */}
      <div style={{ textAlign: 'center' }}>
        <Button
          label="Generate Meal Plan"
          onClick={handleGenerateMealPlan}
          disable={!selectedGoal || selectedMeals.length === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
};

export default Preferences;
