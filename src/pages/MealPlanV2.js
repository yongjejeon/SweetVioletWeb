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

            return { day: dayData.day, meals: mealsForDay };
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

  const nutrition = mealData?.targetNutrition
    ? [
        { label: 'Calories', value: mealData.targetNutrition.calories },
        { label: 'Carbs (g)', value: mealData.targetNutrition.carbs },
        { label: 'Protein (g)', value: mealData.targetNutrition.protein },
        { label: 'Fat (g)', value: mealData.targetNutrition.fat },
      ]
    : [];

  const actionButtonsConfig = [
    {
      label: 'Generate Shopping List',
      onClick: () => console.log('Generate Shopping List clicked'),
      variant: 'primary',
    },
    {
      label: 'Regenerate Meal Plan',
      onClick: () => console.log('Regenerate Meal Plan clicked'),
      variant: 'primary',
    },
    // Add more button configurations as needed
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
          <div key={index} style={{ cursor: 'pointer' }}>
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
