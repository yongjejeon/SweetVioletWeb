import React, { useEffect, useState } from 'react';
import DayCard from '../components/DayCardV2';
import NutritionCard from '../components/NutritionCardV2';
import ActionButtons from '../components/ActionButtons';
import './MealPlan.css';

const MealPlanV2 = () => {
  const [mealData, setMealData] = useState(null);
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch('http://localhost:8000/meal_plans/');
        if (!response.ok) {
          throw new Error('Failed to fetch meal plans');
        }
        const data = await response.json();
        const randomMealPlan = data[Math.floor(Math.random() * data.length)];
        setMealData(randomMealPlan);
        console.log('Fetched and selected meal plan:', randomMealPlan);

        // Fetch all meal details for the selected meal plan
        await fetchMealDetails(randomMealPlan.scheduledDates);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMealDetails = async (scheduledDates) => {
      try {
        const mealDetailsArray = await Promise.all(
          scheduledDates.map(async (dayData) => {
            const mealsForDay = [];

            // Fetch the details for breakfast, lunch, and dinner
            for (const mealType of ['breakfast', 'lunch', 'dinner']) {
              const mealId = dayData[mealType];
              if (mealId) {
                const mealResponse = await fetch(`http://localhost:8000/recipes/${mealId}`);
                if (!mealResponse.ok) {
                  throw new Error(`Failed to fetch meal with ID: ${mealId}`);
                }
                const mealData = await mealResponse.json();
                mealsForDay.push({ type: mealType, ...mealData });
              }
            }

            return {
              day: dayData.day,
              meals: mealsForDay
            };
          })
        );
        setMealDetails(mealDetailsArray);
        console.log('Fetched meal details:', mealDetailsArray);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    fetchMealPlans();
  }, []);

  // Ensure nutrition is fetched from targetNutrition
  const nutrition = mealData?.targetNutrition ? [
    { label: 'Calories', value: mealData.targetNutrition.calories },
    { label: 'Carbs (g)', value: mealData.targetNutrition.carbs },
    { label: 'Protein (g)', value: mealData.targetNutrition.protein },
    { label: 'Fat (g)', value: mealData.targetNutrition.fat }
  ] : [];

  // Log nutrition data to verify
  console.log('Nutrition data:', nutrition);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <h1>Generated Meal Plan for the Week</h1>
      </div>

      {/* Scrollable Meal Plan Section */}
      <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {mealDetails?.map((dayData, index) => {
          // Ensure mealData and mealDetails are available
          if (!mealData || !mealDetails.length) return null;

          // Log the available meals for the day
          console.log(`Processing dayData for day ${dayData.day}:`, dayData);

          return (
            <div key={index} style={{ cursor: 'pointer' }}>
              <DayCard day={dayData.day} meals={dayData.meals} />
            </div>
          );
        })}
      </div>

      {/* Nutrition Overview Section */}
      <div className="meal-plan-container">
        {nutrition.length > 0 && <NutritionCard nutritionData={nutrition} />}
      </div>

      <ActionButtons />
    </div>
  );
};

export default MealPlanV2;
