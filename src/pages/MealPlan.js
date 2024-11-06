// src/pages/MealPlan.js
import React, { useContext } from 'react';
import AppContext from '../AppContext';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext'; // This js file stores the inputs from Preferences.js
import DayCard from '../components/DayCard';
import NutritionCard from '../components/NutritionCard'; // Updated import
import ActionButtons from '../components/ActionButtons';
import { mockMealData } from '../mockMealData';
import './MealPlan.css';

const MealPlan = () => {
  const { selectedMeals, selectedGoal, weight, height } = useContext(AppContext);
  const navigate = useNavigate();

  const calculateTotalPrice = (meals) => {
    return Object.values(meals).reduce((totalPrice, meal) => {
      return totalPrice + meal.ingredients.reduce((mealPrice, ingredient) => {
        return mealPrice + (ingredient.price || 0);
      }, 0);
    }, 0);
  };

  const calculateDailyNutrition = (meals) => {
    const totalNutrition = { calories: 0, carbs: 0, protein: 0, fat: 0 };
    Object.values(meals).forEach((meal) => {
      totalNutrition.calories += meal.calories || 0;
      totalNutrition.carbs += meal.carbs || 0;
      totalNutrition.protein += meal.protein || 0;
      totalNutrition.fat += meal.fat || 0;
    });
    return totalNutrition;
  };

  const totalWeeklyNutrition = mockMealData.reduce(
    (totals, dayData) => {
      const dailyNutrition = calculateDailyNutrition(dayData.meals);
      totals.calories += dailyNutrition.calories;
      totals.carbs += dailyNutrition.carbs;
      totals.protein += dailyNutrition.protein;
      totals.fat += dailyNutrition.fat;
      return totals;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );

  const nutritionData = [
    { label: 'Calories', value: `${totalWeeklyNutrition.calories.toFixed(0)}` },
    { label: 'Carbs', value: `${totalWeeklyNutrition.carbs}g` },
    { label: 'Protein', value: `${totalWeeklyNutrition.protein}g` },
    { label: 'Fat', value: `${totalWeeklyNutrition.fat}g` },
  ];

  // Handler for navigating to the meal plan detail page for a specific day
  const handleDayClick = (dayIndex) => {
    navigate(`/meal-plan/${dayIndex}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginLeft: '0px' }}>Generated Meal Plan for the Week</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <h1>Generated Meal Plan for the Week</h1>
      </div>

      <div className="meal-plan-container">
        {mockMealData.map((dayData, dayIndex) => {
      {/* Scrollable Meal Plan Section */}
      <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {mockMealData.map((dayData) => {
          const totalPrice = calculateTotalPrice(dayData.meals);
          return (
            <div key={dayData.dayIndex} onClick={() => handleDayClick(dayData.dayIndex)} style={{ cursor: 'pointer' }}>
              <DayCard day={dayData.day} meals={dayData.meals} totalPrice={totalPrice} />
            </div>
          );
        })}
      </div>

      <div className="meal-plan-container">
        <NutritionCard nutritionData={nutritionData} />
      </div>


      {/* Action Buttons */}
      <ActionButtons />
    </div>
  );
};

export default MealPlan;
