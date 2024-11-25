import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import ArrowButton from '../components/ArrowButton';
import './MealPlanDetailV2.css';
// import backgroundIMG1 from '../images/backgroundIMG1.jpg';

//test
const MealPlanDetailV2 = () => {
  const { day } = useParams(); // Retrieve day from URL params
  const navigate = useNavigate();
  const { mealDetails, loading, preferredCuisine } = useAppContext(); // Access preferredCuisine

  // Convert day to a number for comparison
  const dayIndex = parseInt(day, 10);

  // Log the chosen cuisine type on component load
  useEffect(() => {
    console.log('Cuisine chosen:', preferredCuisine);
  }, [preferredCuisine]);

  // Find the data for the specified day
  const dayData = mealDetails?.find((data) => parseInt(data.day, 10) === dayIndex);

  // Handlers for navigating between days
  const handlePreviousDay = () => {
    if (dayIndex > 1) navigate(`/meal-plan/${dayIndex - 1}`);
  };

  const handleNextDay = () => {
    if (dayIndex < 7) navigate(`/meal-plan/${dayIndex + 1}`);
  };

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (!dayData) return <p>Day data not found</p>;

  return (
    <div className="meal-plan-detail">
      <div className="background-image-bar"></div>
      <h1>Meal Plan Details for Day {dayData.day}</h1>

      {/* Left Arrow Button */}
      <ArrowButton direction="left" onClick={handlePreviousDay} disabled={dayIndex === 1} />
      {/* Right Arrow Button */}
      <ArrowButton direction="right" onClick={handleNextDay} disabled={dayIndex === 7} />
      <div className="meal-plan-content">
        <div className="meal-plan-columns">
          {dayData.meals.map((mealData, index) => (
            <div key={index} className="meal-column">
              <h2>{mealData.type.charAt(0).toUpperCase() + mealData.type.slice(1)}</h2>
              <p className="meal-title">{mealData.Recipe_Name}</p>
 
              <div className="nutrition-ingredients">
              <div className="nutrition">
                <h3>Nutrition</h3>
                <p><strong>Calories:</strong> {mealData.calories.toFixed(2)} cal</p>
                <p><strong>Carbs:</strong> {mealData.nutrients.CHOCDF}g</p>
                <p><strong>Protein:</strong> {mealData.nutrients.PROCNT}g</p>
                <p><strong>Fat:</strong> {mealData.nutrients.FAT}g</p>
                <p><strong>Fiber:</strong> {mealData.nutrients.FIBTG}g</p>
                <p><strong>Sugar:</strong> {mealData.nutrients.SUGAR}g</p>
                <p><strong>Calcium (CA):</strong> {mealData.nutrients.CA}mg</p>
                <p><strong>Cholesterol:</strong> {mealData.nutrients.CHOLE}mg</p>
                <p><strong>Monounsaturated Fat:</strong> {mealData.nutrients.FAMS}g</p>
                <p><strong>Polyunsaturated Fat:</strong> {mealData.nutrients.FAPU}g</p>
                <p><strong>Saturated Fat:</strong> {mealData.nutrients.FASAT}g</p>
                <p><strong>Trans Fat:</strong> {mealData.nutrients.FATRN}g</p>
                <p><strong>Iron (FE):</strong> {mealData.nutrients.FE}mg</p>
                <p><strong>Potassium (K):</strong> {mealData.nutrients.K}mg</p>
                <p><strong>Magnesium (MG):</strong> {mealData.nutrients.MG}mg</p>
                <p><strong>Sodium (NA):</strong> {mealData.nutrients.NA}mg</p>
                <p><strong>Phosphorus (P):</strong> {mealData.nutrients.P}mg</p>
                <p><strong>Vitamin A (VITA_RAE):</strong> {mealData.nutrients.VITA_RAE}µg</p>
                <p><strong>Vitamin C (VITC):</strong> {mealData.nutrients.VITC}mg</p>
                <p><strong>Vitamin D (VITD):</strong> {mealData.nutrients.VITD}µg</p>
                <p><strong>Vitamin K (VITK1):</strong> {mealData.nutrients.VITK1}µg</p>
                <p><strong>Water:</strong> {mealData.nutrients.WATER}g</p>
                <p><strong>Zinc (ZN):</strong> {mealData.nutrients.ZN}mg</p>
              </div>

                <div className="ingredients">
                  <h3>Ingredients</h3>
                    {mealData.ingredients.map((ingredient, idx) => (
                      <p key={idx}>
                          {ingredient.quantity} {ingredient.unit && ingredient.unit !== '<unit>' ? ingredient.unit : ''} <br />
                          <strong>{ingredient.name}</strong>
                      </p>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanDetailV2;
