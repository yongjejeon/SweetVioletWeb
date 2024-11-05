// src/components/MealDetail.js
import React from 'react';

const MealDetail = ({ meal, mealType }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
      <h4>{mealType}: {meal.name}</h4>
      <p>Calories: {meal.calories}</p>
      <p>Carbs: {meal.carbs}g</p>
      <p>Protein: {meal.protein}g</p>
      <p>Fat: {meal.fat}g</p>
    </div>
  );
};

export default MealDetail;