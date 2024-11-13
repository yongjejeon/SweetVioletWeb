// src/pages/MealPlanDetailV2.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import ArrowButton from '../components/ArrowButton';
import './MealPlanDetailV2.css';

const MealPlanDetailV2 = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { mealDetails, loading } = useAppContext();

  const dayIndex = parseInt(day, 10);

  const dayData = mealDetails.find((data) => data.day === dayIndex);

  const handlePreviousDay = () => {
    if (dayIndex > 1) navigate(`/meal-plan/${dayIndex - 1}`);
  };

  const handleNextDay = () => {
    if (dayIndex < 7) navigate(`/meal-plan/${dayIndex + 1}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!dayData) return <p>Day data not found</p>;

  return (
    <div className="meal-plan-detail">
      <h1>Meal Plan Details for Day {dayData.day}</h1>

      {/* Left Arrow Button */}
      <ArrowButton direction="left" onClick={handlePreviousDay} disabled={dayIndex === 1} />

      <div className="meal-plan-content">
        <div className="meal-plan-columns">
          {dayData.meals.map((mealData, index) => (
            <div key={index} className="meal-column">
              <h2>{mealData.type.charAt(0).toUpperCase() + mealData.type.slice(1)}</h2>
              <p className="meal-title">{mealData.Recipe_Name}</p>

              <div className="nutrition-ingredients">
                <div className="nutrition">
                  <h3>Nutrition</h3>
                  <p>Calories: {mealData.calories.toFixed(2)}</p>
                  <p>Carbs: {mealData.nutrients.CHOCDF}g</p>
                  <p>Protein: {mealData.nutrients.PROCNT}g</p>
                  <p>Fat: {mealData.nutrients.FAT}g</p>
                  <p>Fiber: {mealData.nutrients.FIBTG}g</p>
                  <p>Sugar: {mealData.nutrients.SUGAR}g</p>
                </div>
                <div className="ingredients">
                  <h3>Ingredients</h3>
                  <ul>
                    {mealData.ingredients.map((ingredient, idx) => (
                      <li key={idx}>
                        {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
         </div>

        {/* Right Arrow */}
        <ArrowButton direction="right" onClick={handleNextDay} disabled={dayIndex === 7} />
      </div>
  );
};

export default MealPlanDetailV2;
