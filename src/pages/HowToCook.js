import React, { useState } from 'react';
import './HowToCook.css'; // Import the CSS file
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom'; 

const HowToCook = () => {
  const { mealDetails, loading } = useAppContext();
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // Track the current day
  const [currentMealIndex, setCurrentMealIndex] = useState(0); // Track the current meal

  const navigate = useNavigate(); // Initialize useNavigate

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mealDetails || mealDetails.length === 0) {
    return <div>No meal details available</div>;
  }

  const currentDay = mealDetails[currentDayIndex];
  const currentMeal = currentDay.meals[currentMealIndex];

  const navigateToPreviousMeal = () => {
    if (currentMealIndex > 0) {
      setCurrentMealIndex(currentMealIndex - 1);
    } else if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
      setCurrentMealIndex(mealDetails[currentDayIndex - 1].meals.length - 1);
    }
  };

  const navigateToNextMeal = () => {
    if (currentMealIndex < currentDay.meals.length - 1) {
      setCurrentMealIndex(currentMealIndex + 1);
    } else if (currentDayIndex < mealDetails.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
      setCurrentMealIndex(0);
    }
  };

  // Placeholder steps for mock data
  const steps = [
    'Crack the eggs into a bowl and whisk until smooth.',
    'Heat a pan on medium heat and add butter.',
    'Pour the whisked eggs into the pan and stir gently.',
    'Toast the bread slices in a toaster.',
    'Serve the scrambled eggs with toasted bread and enjoy!',
  ];

  return (
    <div className="how-to-cook-container">
      {/* Navigation */}
      <div className="day-navigation">
        <span className="nav-arrow left-arrow" onClick={navigateToPreviousMeal}>
          &lt;
        </span>
        <h1 className="meal-title">{currentMeal.Recipe_Name || 'Meal Title'}</h1>
        <span className="nav-arrow right-arrow" onClick={navigateToNextMeal}>
          &gt;
        </span>
      </div>

      {/* Main Content */}
      <div className="how-to-cook-content">
        {/* Left Section */}
        <div className="left-section">
          {/* Meal Picture */}
          <div className="picture-box">
            <img
              src={'https://via.placeholder.com/250'}
              alt={`${currentMeal.Recipe_Name || 'Meal'}`}
              style={{ width: '100%', height: '100%', borderRadius: '8px' }}
            />
          </div>

          {/* Nutritional and Ingredient Details */}
          <div className="details-section">
            {/* Nutritional Info */}
            <div className="calorie-box">
              <h3>Calories: {currentMeal.nutrients?.ENERC_KCAL || 0} kcal</h3>
              <p>Carbs: {currentMeal.nutrients?.CHOCDF || 0}g</p>
              <p>Protein: {currentMeal.nutrients?.PROCNT || 0}g</p>
              <p>Fat: {currentMeal.nutrients?.FAT || 0}g</p>
            </div>

            {/* Ingredients */}
            <div className="ingredient-box">
              <h3>Ingredients</h3>
              {currentMeal.ingredients?.map((ingredient, index) => (
                <p key={index}>
                  {ingredient.name || 'Ingredient'}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h3>How to Cook?</h3>
          {steps.map((step, index) => (
            <p key={index}>
              <strong>Step {index + 1}:</strong> {step}
            </p>
          ))}
        </div>
      </div>

      {/* See Full Meal Plan Button */}
      <button className="full-meal-plan-btn" onClick={() => navigate('/meal-plan-v2')}>
        See Full Meal Plan
      </button>
    </div>
  );
};

export default HowToCook;
