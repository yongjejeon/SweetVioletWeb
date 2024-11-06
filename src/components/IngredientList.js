// src/components/IngredientList.js
import React from 'react';

const IngredientList = ({ ingredients }) => (
  <div className="meal-ingredients">
    <h4>Ingredients</h4>
    <div className="ingredients-content">
      {ingredients.map((ingredient, index) => (
        <p key={index}>
          {ingredient.name}
          <br />
          ${ingredient.price.toFixed(2)}
        </p>
      ))}
    </div>
  </div>
);

export default IngredientList;
