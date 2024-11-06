// src/pages/MealPlan.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext'; // This js file stores the inputs from Preferences.js
import DayCard from '../components/DayCard';
import NutritionOverview from '../components/NutritionOverview';
import ActionButtons from '../components/ActionButtons';
import './MealPlan.css';

const MealPlan = () => {
  const {
    selectedMeals,
    selectedGoal,
    weight,
    height,
  } = useContext(AppContext);

  const navigate = useNavigate();

  // Placeholder nutrition data
  const calories = 2000;
  const carbs = '250g';
  const protein = '100g';
  const fat = '70g';

  // Handler for navigating to the meal plan detail page for a specific day
  const handleDayClick = (day) => {
    navigate(`/meal-plan/${day}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginLeft: '130px' }}>Generated Meal Plan for the Week</h2>
      </div>

      {/* Scrollable Meal Plan Section */}
      <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {[...Array(7).keys()].map((day) => (
          <div key={day} onClick={() => handleDayClick(day + 1)} style={{ cursor: 'pointer' }}>
            <DayCard day={day + 1} />
          </div>
        ))}
      </div>

      {/* Nutrition Overview Section */}
      <NutritionOverview calories={calories} carbs={carbs} protein={protein} fat={fat} />

      {/* Action Buttons */}
      <ActionButtons />
    </div>
  );
};

export default MealPlan;
