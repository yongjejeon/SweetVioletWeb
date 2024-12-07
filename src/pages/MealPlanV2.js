import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import DayCard from '../components/DayCardV2';
import NutritionCard from '../components/NutritionCardV2';
import ActionButtons from '../components/ActionButtons';
import LoadingVideo from '../images/GeneratingMeal.mp4';
import './MealPlan.css';

const MealPlanV2 = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isFetchingExplanation, setIsFetchingExplanation] = useState(false);
  const API_URL = 'https://moodmeals-backend-1011833328775.us-central1.run.app'
  
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
  
    const calculateNutrition = () => {
      let totalCalories = 0;
      let totalCarbs = 0;
      let totalProtein = 0;
      let totalFat = 0;
    
      mealDetails?.forEach((dayData) => {
        dayData.meals.forEach((meal) => {
          totalCalories += meal.calories || 0;
          totalCarbs += meal.nutrients?.CHOCDF || 0; // Carbs
          totalProtein += meal.nutrients?.PROCNT || 0; // Protein
          totalFat += meal.nutrients?.FAT || 0; // Fat
        });
      });
    
      return [
        { label: 'Calories', value: totalCalories.toFixed(2) },
        { label: 'Carbs (g)', value: totalCarbs.toFixed(2) },
        { label: 'Protein (g)', value: totalProtein.toFixed(2) },
        { label: 'Fat (g)', value: totalFat.toFixed(2) },
      ];
    };
    
    const nutrition = calculateNutrition();
    
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
              const mealResponse = await fetch(`${API_URL}/recipes/${mealId}`);
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

    const baseUrl = `${API_URL}/recipes/random/${serializedPreferences}/`;
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
          const mealData = await fetch(`${API_URL}/recipes/${breakfastId}`);
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
            const allBreakfastsData = await fetch(`${API_URL}/recipes/filter/?meal_type=breakfast`);
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
          const mealData = await fetch(`${API_URL}/recipes/${lunchId}`);
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
            const allLunchesData = await fetch(`${API_URL}/recipes/filter/?meal_type=lunch/dinner`);
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
          const mealData = await fetch(`${API_URL}/recipes/${dinnerId}`);
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
            const allDinnersData = await fetch(`${API_URL}/recipes/filter/?meal_type=lunch/dinner`);
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

  const formatExplanation = (text) => {
    // Replace list markers (e.g., "1. ") with <strong> tags and line breaks
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Replace **bold** with <strong> tags
      .replace(/(\d+\.\s)/g, '<br/><strong>$1</strong>'); // Format numbered list markers
    return formattedText.split('<br>').map((segment, index) => `<p key=${index}>${segment.trim()}</p>`).join('');
  };
  
  
  
  const fetchExplanation = async () => {
    setIsFetchingExplanation(true);
    setIsModalOpen(true);
    try {
      const response = await fetch(`${API_URL}/openai/explanations`, {
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
      const formattedExplanation = formatExplanation(data.generalExplanation); // Format explanation
      setExplanation(formattedExplanation); // Set the formatted explanation as HTML
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setExplanation('<p>Failed to fetch explanation. Please try again.</p>');
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
  //loading animation
  if (loading) {
    return (
      <div
        style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '90vh', 
        }}
      >
        <video
          style={{
            width: '60%', 
            height: 'auto', 
            objectFit: 'cover', 
          }}
          autoPlay
          loop
          muted
        >
          <source src={LoadingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px'}}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', fontSize:"22px" }}>
        <h1 style = {{color: '#574284'}}>Generated Meal Plan for the Week</h1>
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
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '80%',
      maxWidth: '600px',
      padding: '20px',
      zIndex: 1000,
    }}
  >
    <h2 style={{ textAlign: 'center', color: '#574284', marginBottom: '20px' }}>How This Helps Your Mood</h2>
    <div
      style={{
        textAlign: 'center',
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.6',
      }}
      dangerouslySetInnerHTML={{ __html: explanation }}
    ></div>
    <button
      onClick={closeModal}
      style={{
        display: 'block',
        margin: '20px auto 0',
        padding: '10px 20px',
        backgroundColor: '#574284',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
    >
      Close
    </button>
  </div>
)}



    </div>
  );
};

export default MealPlanV2;
