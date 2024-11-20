import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import DayCard from '../components/DayCardV2';
import NutritionCard from '../components/NutritionCardV2';
import ActionButtons from '../components/ActionButtons';
import './MealPlan.css';

const MealPlanV2 = () => {
  const {
    mealData,
    setMealData,
    mealDetails,
    setMealDetails,
    loading,
    setLoading,
  } = useAppContext();
  const { selectedMeals, selectedGoal, weight, height } = useAppContext();
  const navigate = useNavigate();

  const nutrition = mealData?.targetNutrition
    ? [
        { label: 'Calories', value: mealData.targetNutrition.calories },
        { label: 'Carbs (g)', value: mealData.targetNutrition.carbs },
        { label: 'Protein (g)', value: mealData.targetNutrition.protein },
        { label: 'Fat (g)', value: mealData.targetNutrition.fat },
      ]
    : [];

  const fetchMealPlans = async () => {
    setLoading(true); // Show loading while fetching data
    try {
      const response = await fetch('http://localhost:8000/meal_plans/');
      if (!response.ok) throw new Error('Failed to fetch meal plans');
      const data = await response.json();
      const randomMealPlan = data[Math.floor(Math.random() * data.length)];
      setMealData(randomMealPlan);
      await fetchMealDetails(randomMealPlan.scheduledDates);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  const fetchMealDetails = async (scheduledDates) => {
    try {
      const mealDetailsArray = await Promise.all(
        scheduledDates.map(async (dayData) => {
          const mealsForDay = [];
          for (const mealType of ['breakfast', 'lunch', 'dinner']) {
            const mealId = dayData[mealType];
            if (mealId) {
              const mealResponse = await fetch(`http://localhost:8000/recipes/${mealId}`);
              const mealData = await mealResponse.json();
              mealsForDay.push({ type: mealType, ...mealData });
            }
          }
          return { day: dayData.day, meals: mealsForDay };
        })
      );
      setMealDetails(mealDetailsArray);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  const handleDayClick = (day) => {
    navigate(`/meal-plan/${day}`);
  };


  const fetchMealPlanTest = async (params = {}) => {
    const baseUrl = "http://127.0.0.1:8000/recipes/random/"; // Replace with your backend's URL
  
    // Construct the query string from params
    const queryString = new URLSearchParams(params).toString();
  
    try {
      console.log(`${baseUrl}?${queryString}`)
      const response = await fetch(`${baseUrl}?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const mealPlan = await response.json();
      console.log(mealPlan)
      return mealPlan;
    } catch (error) {
      console.error("Failed to fetch meal plan:", error);
      throw error;
    }
  };
  
  const actionButtonsConfig = [
    {
      label: 'Generate Shopping List',
      onClick: () => console.log('Generate Shopping List clicked'),
      variant: 'primary',
    },
    {
      label: 'Cooking Instructions',
      onClick: () => navigate('/how-to-cook'),
      variant: 'primary',
    },
    {
      label: 'Regenerate Meal Plan',
      onClick: () => {
        fetchMealPlanTest({
          cuisine_type: "italian",
          meal_type: "dinner",
          diet_label: "vegetarian",
        }) // Fetch a new meal plan on button click
      },
      variant: 'primary',
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <h1>Generated Meal Plan for the Week</h1>
      </div>

      <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {mealDetails?.map((dayData, index) => (
          <div key={index} style={{ cursor: 'pointer' }} onClick={() => handleDayClick(dayData.day)}>
            <DayCard day={dayData.day} meals={dayData.meals} />
          </div>
        ))}
      </div>

      <div className="meal-plan-container">
        {nutrition.length > 0 && <NutritionCard nutritionData={nutrition} />}
      </div>

      <ActionButtons buttons={actionButtonsConfig} />
    </div>
  );
};

export default MealPlanV2;