import React from 'react';
import './HowToCook.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';


const HowToCook = () => {
  // Mock data for the page
  const mockData = {
    day: 'Day 1',
    meal: 'Breakfast',
    image: 'https://via.placeholder.com/250', // Placeholder image URL
    nutrition: {
      calories: 350,
      carbs: 45,
      protein: 15,
      fat: 10,
      vitamins: 'A, C, D',
    },
    ingredients: [
      { name: 'Eggs', price: 2.5 },
      { name: 'Bread', price: 1.0 },
      { name: 'Milk', price: 1.5 },
      { name: 'Butter', price: 0.5 },
      { name: 'Salt', price: 0.2 },
    ],
    steps: [
      'Crack the eggs into a bowl and whisk until smooth.',
      'Heat a pan on medium heat and add butter.',
      'Pour the whisked eggs into the pan and stir gently.',
      'Toast the bread slices in a toaster.',
      'Serve the scrambled eggs with toasted bread and enjoy!',
    ],
  };

  // Total price calculation
  const totalPrice = mockData.ingredients.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className="how-to-cook-container">
      {/* Navigation */}
      <div className="day-navigation">
        <span className="nav-arrow" onClick={() => console.log('Navigate to Previous Meal')}>
          &lt; Yesterday’s Dinner
        </span>
        <h1>{mockData.day}</h1>
        <span className="nav-arrow" onClick={() => console.log('Navigate to Next Meal')}>
          Lunch &gt;
        </span>
      </div>

      {/* Main Content */}
      <div className="how-to-cook-content">
        {/* Left Section */}
        <div className="left-section">
          {/* Meal Picture */}
          <div className="picture-box">
            <img
              src={mockData.image}
              alt={`${mockData.meal}`}
              style={{ width: '100%', height: '100%', borderRadius: '8px' }}
            />
          </div>

          {/* Nutritional and Ingredient Details */}
          <div className="details-section">
            {/* Nutritional Info */}
            <div className="calorie-box">
              <h3>Calories: {mockData.nutrition.calories} kcal</h3>
              <p>Carbs: {mockData.nutrition.carbs}g</p>
              <p>Protein: {mockData.nutrition.protein}g</p>
              <p>Fat: {mockData.nutrition.fat}g</p>
              <p>Vitamins: {mockData.nutrition.vitamins}</p>
            </div>

            {/* Ingredients */}
            <div className="ingredient-box">
              <h3>Ingredients</h3>
              {mockData.ingredients.map((ingredient, index) => (
                <p key={index}>
                  {ingredient.name} - ${ingredient.price.toFixed(2)}
                </p>
              ))}
              <p><strong>Expected Price: ${totalPrice}</strong></p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h3>How to Cook?</h3>
          {mockData.steps.map((step, index) => (
            <p key={index}>
              <strong>Step {index + 1}:</strong> {step}
            </p>
          ))}
        </div>
      </div>

      {/* See Full Meal Plan Button */}
      <button className="full-meal-plan-btn" onClick={() => console.log('Navigate to Full Meal Plan')}>
        See Full Meal Plan
      </button>
    </div>
  );
};

export default HowToCook;