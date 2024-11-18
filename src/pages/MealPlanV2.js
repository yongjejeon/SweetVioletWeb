// src/pages/MealPlanV2.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useAppContext } from '../AppContext';
import DayCard from '../components/DayCardV2';
import NutritionCard from '../components/NutritionCardV2';
import ActionButtons from '../components/ActionButtons';
import './MealPlan.css';

const MealPlanV2 = () => {
  const { mealData, mealDetails, loading } = useAppContext();
  

  const navigate = useNavigate(); // Initialize useNavigate

  const nutrition = mealData?.targetNutrition
    ? [
        { label: 'Calories', value: mealData.targetNutrition.calories },
        { label: 'Carbs (g)', value: mealData.targetNutrition.carbs },
        { label: 'Protein (g)', value: mealData.targetNutrition.protein },
        { label: 'Fat (g)', value: mealData.targetNutrition.fat },
      ]
    : [];

  const actionButtonsConfig = [
    {
      label: 'Generate Shopping List',
      onClick: () => console.log('Generate Shopping List clicked'),
      variant: 'primary',
    },
    {
      label: 'Cooking Instructions',
      onClick: () => navigate('/how-to-cook'),
      variant: 'primary',
    },
    {
      label: 'Regenerate Meal Plan',
      onClick: () => console.log('Regenerate Meal Plan clicked'),
      variant: 'primary',
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDayClick = (day) => {
    navigate(`/meal-plan/${day}`); // Navigate to the detail page for the specific day
  };
  const handleCookClick = (day) => {
    navigate(`/meal-plan/${day}`); // Navigate to the detail page for the specific day
  };

  return (
    
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <h1>Generated Meal Plan for the Week</h1>
        
      </div>

      <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {mealDetails?.map((dayData, index) => (
          <div key={index} style={{ cursor: 'pointer' }} onClick={() => handleDayClick(dayData.day)}>
            <DayCard day={dayData.day} meals={dayData.meals} />
          </div>
        ))}
      </div>

      <div className="meal-plan-container">
        {nutrition.length > 0 && <NutritionCard nutritionData={nutrition} />}
      </div>

      <ActionButtons buttons={actionButtonsConfig} />
    </div>
  );
};

export default MealPlanV2;