// src/pages/MealPlan.js
import React, { useContext } from 'react';
import AppContext from '../AppContext'; //this js file stores the inputs from Preferences.js
import DayCard from '../components/DayCard';
import NutritionOverview from '../components/NutritionOverview';
import ActionButtons from '../components/ActionButtons';
import './MealPlan.css';

const MealPlan = () => {
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

  // Assuming these values are coming from the context (replace with actual data)
  const calories = 2000;
  const carbs = '250g';
  const protein = '100g';
  const fat = '70g';

  return (
    <div style={{ padding: '20px' }}>
      {/* Header with Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginLeft: '130px' }}>Generated Meal Plan for the Week</h2>
      </div>

      {/* Scrollable Meal Plan Section */}
      <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {[...Array(7).keys()].map((day) => (
          <DayCard key={day} day={day + 1} />
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
