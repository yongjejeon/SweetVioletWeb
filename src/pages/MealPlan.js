// src/pages/MealPlan.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext'; // This js file stores the inputs from Preferences.js
import DayCard from '../components/DayCard';
import NutritionOverview from '../components/NutritionOverview';
import ActionButtons from '../components/ActionButtons';
import { mockMealData } from '../mockMealData'; // Import mock data
import './MealPlan.css';

const MealPlan = () => {
  const { selectedMeals, selectedGoal, weight, height } = useContext(AppContext);

  const navigate = useNavigate();

  // Function to calculate total price for each day
  const calculateTotalPrice = (meals) => {
    return Object.values(meals).reduce((totalPrice, meal) => {
      return totalPrice + meal.ingredients.reduce((mealPrice, ingredient) => {
        return mealPrice + (ingredient.price || 0); // Add ingredient price if available
      }, 0);
    }, 0);
  };

  // Function to calculate daily nutrition (calories, carbs, protein, fat)
  const calculateDailyNutrition = (meals) => {
    const totalNutrition = {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
    };

    // Loop through each meal (breakfast, lunch, dinner)
    Object.values(meals).forEach((meal) => {
      totalNutrition.calories += meal.calories || 0;
      totalNutrition.carbs += meal.carbs || 0;
      totalNutrition.protein += meal.protein || 0;
      totalNutrition.fat += meal.fat || 0;
    });

    return totalNutrition;
  };

  // Calculate total weekly nutrition for overview
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

  // Handler for navigating to the meal plan detail page for a specific day using dayIndex
  const handleDayClick = (dayIndex) => {
    navigate(`/meal-plan/${dayIndex}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <h1>Generated Meal Plan for the Week</h1>
      </div>    

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

      {/* Nutrition Overview Section */}
      <div className="meal-plan-container">
        <NutritionOverview
          calories={`${totalWeeklyNutrition.calories.toFixed(0)} Kcal`} // Append "Kcal" to calories value 
          carbs={`${totalWeeklyNutrition.carbs}g`} // Make sure carbs are passed as string with 'g'
          protein={`${totalWeeklyNutrition.protein}g`} // Same for protein
          fat={`${totalWeeklyNutrition.fat}g`} // Same for fat
        />
      </div>

      {/* Action Buttons */}
      <ActionButtons />
    </div>
  );
};

export default MealPlan;
