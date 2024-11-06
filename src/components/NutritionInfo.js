// src/components/NutritionInfo.js
import React from 'react';

const NutritionInfo = ({ calories, carbs, protein, fat }) => (
  <div className="meal-nutrition">
    <h4>Nutritions</h4>
    <div className="nutrition-content">
      <p>Calories: {calories} Kcal</p>
      <p>Carbs: {carbs} g</p>
      <p>Protein: {protein} g</p>
      <p>Fat: {fat} g</p>
    </div>
  </div>
);

export default NutritionInfo;
