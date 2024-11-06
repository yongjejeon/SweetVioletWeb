// src/pages/MealPlanDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockMealData } from '../mockMealData';
import './MealPlanDetail.css';
import ArrowButton from '../components/ArrowButton';
import NutritionInfo from '../components/NutritionInfo';
import IngredientList from '../components/IngredientList';

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

      <div className="meal-plan-content">
        {/* Left Arrow */}
        <ArrowButton direction="left" onClick={handlePreviousDay} disabled={dayIndex === 1} />

        {/* Meal Columns */}
        <div className="meal-plan-columns">
          {Object.entries(dayData.meals).map(([mealType, mealData]) => (
            <div key={mealType} className="meal-plan-column">
              <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
              <p className="meal-plan-title">{mealData.name}</p>

              <div className="meal-details">
                <NutritionInfo
                  calories={mealData.calories}
                  carbs={mealData.carbs}
                  protein={mealData.protein}
                  fat={mealData.fat}
                />

                <IngredientList ingredients={mealData.ingredients} />
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <ArrowButton direction="right" onClick={handleNextDay} disabled={dayIndex === 7} />
      </div>
    </div>
  );
};

export default MealPlanDetail;
