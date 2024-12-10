import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import ArrowButton from '../components/ArrowButton';
import './MealPlanDetailV2.css';

const MealPlanDetailV2 = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { mealDetails, loading, preferredCuisine } = useAppContext();
  const dayIndex = parseInt(day, 10);
  const [activeTab, setActiveTab] = useState('nutrition'); // State to track active tab

  useEffect(() => {
    console.log('Cuisine chosen:', preferredCuisine);
  }, [preferredCuisine]);

  const dayData = mealDetails?.find((data) => parseInt(data.day, 10) === dayIndex);

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
      <div className="background-image-bar"></div>
      <h1 className="meal-plan-title">Meal Plan Details for Day {dayData.day}</h1>

      {/* Left Arrow Button */}
      <ArrowButton direction="left" onClick={handlePreviousDay} disabled={dayIndex === 1} />
      {/* Right Arrow Button */}
      <ArrowButton direction="right" onClick={handleNextDay} disabled={dayIndex === 7} />

      <div className="meal-plan-content">
        <div className="meal-plan-columns">
          {dayData.meals.map((mealData, index) => (
            <div key={index} className="meal-column">
              <h2 className="meal-header">{mealData.type.charAt(0).toUpperCase() + mealData.type.slice(1)}</h2>
              <p className="meal-title">{mealData.Recipe_Name}</p>

              {/* Add Cuisine Type and Diet Labels */}
              <div className="meal-details">
                <p className="meal-detail">
                  <strong>Cuisine Type:</strong> {mealData.cuisine_type || 'Not Available'}
                </p>
                <p className="meal-detail">
                  <strong>Diet Labels:</strong> {mealData.diet_labels?.join(', ') || 'Not Available'}
                </p>
              </div>

              <div className="tabs">
                <button
                  className={`tab-button ${activeTab === 'nutrition' ? 'active' : ''}`}
                  onClick={() => setActiveTab('nutrition')}
                >
                  Nutrition
                </button>
                <button
                  className={`tab-button ${activeTab === 'ingredients' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ingredients')}
                >
                  Ingredients
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'nutrition' ? (
                  <div className="nutrition">
                    <h3>Nutrition</h3>
                    <div className="nutrition-item">
                      <span className="nutrition-title">Calories</span>
                      <span className="nutrition-value">{Math.round(mealData.calories)} cal</span>
                    </div>
                    <div className="divider"></div>
                    <div className="nutrition-item">
                      <span className="nutrition-title">Carbs</span>
                      <span className="nutrition-value">{Math.round(mealData.nutrients.CHOCDF)}g</span>
                    </div>
                    <div className="divider"></div>
                    <div className="nutrition-item">
                      <span className="nutrition-title">Protein</span>
                      <span className="nutrition-value">{Math.round(mealData.nutrients.PROCNT)}g</span>
                    </div>
                    <div className="divider"></div>
                    <div className="nutrition-item">
                      <span className="nutrition-title">Fat</span>
                      <span className="nutrition-value">{Math.round(mealData.nutrients.FAT)}g</span>
                    </div>
                    <div className="divider"></div>
                    <div className="nutrition-item">
                      <span className="nutrition-title">Fiber</span>
                      <span className="nutrition-value">{Math.round(mealData.nutrients.FIBTG)}g</span>
                    </div>
                    <div className="divider"></div>
                  </div>
                ) : (
                  <div className="ingredients">
                    <h3>Ingredients</h3>
                    {mealData.ingredients.map((ingredient, idx) => {
                      const quantityDisplay = ingredient.quantity === "0" ? "To Taste" : parseFloat(ingredient.quantity).toFixed(1);
                      const unitDisplay = ingredient.unit === "<unit>" ? "" : ingredient.unit;

                      return (
                        <div key={idx} className="ingredient-item">
                          <span className="ingredient-name">{ingredient.name}</span>
                          <span className="ingredient-quantity">
                            {quantityDisplay} {unitDisplay}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanDetailV2;
