import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import DayCard from '../components/DayCardV2';
import NutritionCard from '../components/NutritionCardV2';
import ActionButtons from '../components/ActionButtons';
import './MealPlan.css';

const MealPlanV2 = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isFetchingExplanation, setIsFetchingExplanation] = useState(false);
  
  const {
    mealData,
    setMealData,
    mealDetails,
    setMealDetails,
    loading,
    setLoading,
    navigationFromQuestion8, // Track flag
    setNavigationFromQuestion8,
    
  } = useAppContext();
  const { selectedEmotionGoal, selectedMood, selectedMeals, selectedGoal, weight, height , activityLevel, dietaryRestriction, preferredCuisine, gender, Goals} = useAppContext();

  const packaged_preferences = {
    selectedEmotionGoal,
    selectedMood,
    selectedMeals,
    selectedGoal,
    weight,
    height,
    activityLevel,
    dietaryRestriction,
    preferredCuisine,
    gender,
    Goals
  };

  useEffect(() => {
    // Only call fetchMealPlanTest if navigating from the Preferences page
    if (navigationFromQuestion8) {
      fetchMealPlanTest();
      setNavigationFromQuestion8(false); // Reset flag after the function is called
    }
  }, [navigationFromQuestion8, setNavigationFromQuestion8]);

  const navigate = useNavigate();

  const nutrition = mealData?.targetNutrition
    ? [
        { label: 'Calories', value: mealData.targetNutrition.calories },
        { label: 'Carbs (g)', value: mealData.targetNutrition.carbs },
        { label: 'Protein (g)', value: mealData.targetNutrition.protein },
        { label: 'Fat (g)', value: mealData.targetNutrition.fat },
      ]
    : [];

  const fetchMealPlans = async (data) => {
    setLoading(true); // Show loading while fetching data
    console.log(data)
    console.log("fetching fjasdklfjkalsdjf")
    try {
      setMealData(data);
      await fetchMealDetails(data.scheduledDates);
    } catch (error) {
      console.error('Error parsing sample data', error);
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
    const serializedPreferences = encodeURIComponent(JSON.stringify(packaged_preferences));

    const baseUrl = `http://127.0.0.1:8000/recipes/random/${serializedPreferences}/`;
  
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
      console.log("MealPlan keys:", Object.keys(mealPlan));
      console.log("MealPlan keys:", mealPlan[0]);

      const test = mealPlan.scheduledDates;
      console.log("this should work", test)
      console.log('Fetched meal plan:', mealPlan);

      if (test) {
        validate(mealPlan);  // Only call validate if scheduledDates exists
      } else {
        console.error('Scheduled dates not found in fetched meal plan');
      }
    } catch (error) {
      console.error("Failed to fetch meal plan:", error);
      throw error;
    }
  };

  const validate = async (data) => {
    const validatedMeals = {
      meals: [], // Will hold validated meal IDs
      scheduledDates: [], // Will hold the schedule with validated meal IDs
      targetNutrition: data.targetNutrition, // Copy target nutrition directly from the argument
    };
    console.log("this is the data: ",data)
    console.log("this is the data schedule", data.scheduledDates)
  
    // Set to store valid meal IDs
    const validMealIds = new Set();
  
    for (const schedule of data.scheduledDates) {
      const day = schedule.day;
      const validatedDay = { day }; // Start by copying the current day
  
      // Validate breakfast
      if ("breakfast" in schedule) {
        const breakfastId = schedule.breakfast;
        try {
          const mealData = await fetch(`http://localhost:8000/recipes/${breakfastId}`);
          if (!mealData.ok) {
            throw new Error(`Invalid breakfast meal ID for day ${day}`);
          }
          const meal = await mealData.json();
          console.log(`Day ${day} - Specific breakfast meal fetched:`, meal);
          validatedDay.breakfast = breakfastId; // Valid ID
          validMealIds.add(breakfastId); // Add to valid meal IDs set
        } catch (error) {
          console.error(`Day ${day} - Error fetching specific breakfast meal:`, error);
          try {
            const allBreakfastsData = await fetch(`http://localhost:8000/recipes/filter/?meal_type=breakfast`);
            if (!allBreakfastsData.ok) {
              throw new Error(`Failed to fetch all breakfast meals for day ${day}`);
            }
            const allBreakfasts = await allBreakfastsData.json();
            const randomMeal = allBreakfasts[Math.floor(Math.random() * allBreakfasts.length)];
            console.log(`Day ${day} - Random breakfast meal fetched:`, randomMeal);
            validatedDay.breakfast = randomMeal._id; // Valid random ID
            validMealIds.add(randomMeal._id); // Add to valid meal IDs set
          } catch (fallbackError) {
            console.error(`Day ${day} - Error fetching random breakfast meal:`, fallbackError);
          }
        }
      }
  
      // Validate lunch (if applicable)
      if ("lunch" in schedule) {
        const lunchId = schedule.lunch;
        try {
          const mealData = await fetch(`http://localhost:8000/recipes/${lunchId}`);
          if (!mealData.ok) {
            throw new Error(`Invalid lunch meal ID for day ${day}`);
          }
          const meal = await mealData.json();
          console.log(`Day ${day} - Specific lunch meal fetched:`, meal);
          validatedDay.lunch = lunchId; // Valid ID
          validMealIds.add(lunchId); // Add to valid meal IDs set
        } catch (error) {
          console.error(`Day ${day} - Error fetching specific lunch meal:`, error);
          try {
            const allLunchesData = await fetch(`http://localhost:8000/recipes/filter/?meal_type=lunch/dinner`);
            if (!allLunchesData.ok) {
              throw new Error(`Failed to fetch all lunch meals for day ${day}`);
            }
            const allLunches = await allLunchesData.json();
            const randomMeal = allLunches[Math.floor(Math.random() * allLunches.length)];
            console.log(`Day ${day} - Random lunch meal fetched:`, randomMeal);
            validatedDay.lunch = randomMeal._id; // Valid random ID
            validMealIds.add(randomMeal._id); // Add to valid meal IDs set
          } catch (fallbackError) {
            console.error(`Day ${day} - Error fetching random lunch meal:`, fallbackError);
          }
        }
      }
  
      // Validate dinner
      if ("dinner" in schedule) {
        const dinnerId = schedule.dinner;
        try {
          const mealData = await fetch(`http://localhost:8000/recipes/${dinnerId}`);
          if (!mealData.ok) {
            throw new Error(`Invalid dinner meal ID for day ${day}`);
          }
          const meal = await mealData.json();
          console.log(`Day ${day} - Specific dinner meal fetched:`, meal);
          validatedDay.dinner = dinnerId; // Valid ID
          validMealIds.add(dinnerId); // Add to valid meal IDs set
        } catch (error) {
          console.error(`Day ${day} - Error fetching specific dinner meal:`, error);
          try {
            const allDinnersData = await fetch(`http://localhost:8000/recipes/filter/?meal_type=lunch/dinner`);
            if (!allDinnersData.ok) {
              throw new Error(`Failed to fetch all dinner meals for day ${day}`);
            }
            const allDinners = await allDinnersData.json();
            const randomMeal = allDinners[Math.floor(Math.random() * allDinners.length)];
            console.log(`Day ${day} - Random dinner meal fetched:`, randomMeal);
            validatedDay.dinner = randomMeal._id; // Valid random ID
            validMealIds.add(randomMeal._id); // Add to valid meal IDs set
          } catch (fallbackError) {
            console.error(`Day ${day} - Error fetching random dinner meal:`, fallbackError);
          }
        }
      }
  
      // Add validated day to the validatedMeals array
      validatedMeals.scheduledDates.push(validatedDay);
    }
  
    // Populate the 'meals' array with all the unique valid meal IDs
    validatedMeals.meals = Array.from(validMealIds);
  
    // Log or return the validated meals structure
    console.log("Validated Meals:", validatedMeals);
    fetchMealPlans(validatedMeals); // Return the validated data
  };


  const fetchExplanation = async () => {
    setIsFetchingExplanation(true);
    setIsModalOpen(true);
    try {
      const response = await fetch('http://localhost:8000/openai/explanations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealDetails,
          selectedEmotionGoal,
          selectedMood,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch explanation');
      }
  
      const data = await response.json(); // Parse JSON response
      setExplanation(data.generalExplanation); // Use the generalExplanation field
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setExplanation('Failed to fetch explanation. Please try again.');
    } finally {
      setIsFetchingExplanation(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExplanation('');
  };
  
  
  const actionButtonsConfig = [
    {
      label: 'Generate Shopping List',
      onClick: () => navigate('/summary'),
      variant: 'primary',
    },
    
    {
      label: 'Regenerate Meal Plan',
      onClick: () => {
        fetchMealPlanTest();  
      },
      variant: 'primary',
    },
    {
      label: 'How this helps your mood',
      onClick: fetchExplanation,
      variant: 'primary',
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px'}}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <h1 style = {{color: '#6A4C9C'}}>Generated Meal Plan for the Week</h1>
      </div>

      <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px', padding: '10px' }}>
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

      {isModalOpen && (
      <div>
        <div>
          <h2>How This Helps Your Mood</h2>
          {isFetchingExplanation ? (
            <p>Loading explanation...</p>
          ) : (
            <p>{explanation}</p> // Explanation displayed here
          )}
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    )}

    </div>
  );
};

export default MealPlanV2;
