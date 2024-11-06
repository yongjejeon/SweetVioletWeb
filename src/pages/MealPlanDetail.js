// src/pages/MealPlanDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockMealData } from '../mockMealData';
import './MealPlanDetail.css';
import arrowRight from '../images/arrow-right.png'; // Import the arrow image

const MealPlanDetail = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayIndex = parseInt(day, 10);

  const dayData = mockMealData.find((data) => data.dayIndex === dayIndex);

  const handlePreviousDay = () => {
    if (dayIndex > 1) navigate(`/meal-plan/${dayIndex - 1}`);
  };

  const handleNextDay = () => {
    if (dayIndex < 7) navigate(`/meal-plan/${dayIndex + 1}`);
  };

  if (!dayData) return <p>Day data not found</p>;

  return (
    <div className="meal-plan-detail">
      <h1>Meal Plan Details for {dayData.day}</h1>

      {/* Flex container for arrows and meal columns */}
      <div className="meal-plan-content">
        {/* Left Arrow */}
        <img
          src={arrowRight}
          alt="Previous"
          className="arrow arrow-left"
          onClick={handlePreviousDay}
          style={{ opacity: dayIndex === 1 ? 0.5 : 1, cursor: dayIndex === 1 ? 'not-allowed' : 'pointer' }}
        />

        {/* Meal Columns */}
        <div className="meal-plan-columns">
          {Object.entries(dayData.meals).map(([mealType, mealData]) => (
            <div key={mealType} className="meal-plan-column">
              <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
              <p className="meal-plan-title">{mealData.name}</p>

              <div className="meal-details">
                <div className="meal-nutrition">
                  <h4>Nutritions</h4>
                  <div className="nutrition-content">
                    <p>Calories: {mealData.calories}Kcal</p>
                    <p>Carbs: {mealData.carbs}g</p>
                    <p>Protein: {mealData.protein}g</p>
                    <p>Fat: {mealData.fat}g</p>
                  </div>
                </div>

                <div className="meal-ingredients">
                  <h4>Ingredients</h4>
                  <div className="ingredients-content">
                    {mealData.ingredients.map((ingredient, index) => (
                      <p key={index}>
                        {ingredient.name}
                        <br></br> 
                        ${ingredient.price.toFixed(2)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <img
          src={arrowRight}
          alt="Next"
          className="arrow arrow-right"
          onClick={handleNextDay}
          style={{ opacity: dayIndex === 7 ? 0.5 : 1, cursor: dayIndex === 7 ? 'not-allowed' : 'pointer' }}
        />
      </div>
    </div>
  );
};

export default MealPlanDetail;
