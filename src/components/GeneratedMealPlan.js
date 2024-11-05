// src/components/GeneratedMealPlan.js
import React from 'react';
import MealDetail from './MealDetail';

// Sample meal data (in reality, replace with API or mock data)
const mockMealData = [
  {
    day: 'Day 1',
    meals: {
      breakfast: { name: 'Oatmeal', calories: 300, carbs: 40, protein: 10, fat: 5 },
      lunch: { name: 'Grilled Chicken Salad', calories: 450, carbs: 30, protein: 40, fat: 15 },
      dinner: { name: 'Salmon and Quinoa', calories: 600, carbs: 45, protein: 35, fat: 20 }
    }
  },
  // Add more days as needed
];

const GeneratedMealPlan = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Generated Meal Plan</h2>
      <div>
        {mockMealData.map((dayData, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{dayData.day}</h3>
            <MealDetail meal={dayData.meals.breakfast} mealType="Breakfast" />
            <MealDetail meal={dayData.meals.lunch} mealType="Lunch" />
            <MealDetail meal={dayData.meals.dinner} mealType="Dinner" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedMealPlan;