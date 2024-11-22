// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Question8 = () => {
  const {
    Goals, // Access the state
    setGoals, // Update the state
    setMealData,
    setMealDetails,
    setLoading,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion7 = () => {
    navigate('/Question7');
  };

  const handleGenerateMealPlan = async () => {
    setLoading(true); // Show loading while fetching data

    const fetchMealPlans = async () => {
      try {
        const response = await fetch('http://localhost:8000/meal_plans/');
        if (!response.ok) throw new Error('Failed to fetch meal plans');
        const data = await response.json();
        const randomMealPlan = data[Math.floor(Math.random() * data.length)];
        console.log(randomMealPlan)
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

    await fetchMealPlans(); // Call the fetch function
    navigate('/meal-plan-v2'); // Navigate after fetching the meal plan
  };

  const data = [
    {
      title: 'Do You Have Any Other Goals You Want To Achieve?',
    },
  ];

  // Styling for the container (fixed 200px from the top)
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: '200px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: '20px',
  };

  // Mimicking the card style
  const cardStyle = {
    backgroundColor: '#90a5a0', // Pale purple background
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
  };

  const titleStyle = {
    fontSize: '2rem', // Increased font size
    marginBottom: '15px',
    color: 'white', // Updated title color
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif', // Poppins for the title
  };

  // Styling for the button container to align buttons horizontally
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
    gap: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>{data[0].title}</h2>
        {/* Input field for Goals, type 'text' */}
        <Input 

          value={Goals} 
          onChange={setGoals} 
          placeholder="Enter your goals here..." 
          type="text" // Set type to 'text' for goals
          
        />
      </div>

      <div style={buttonContainerStyle}>
        <Button
          className="button"
          label="Prev"
          onClick={goToQuestion7}
        />
        <Button
          className="button"
          label="Generate Meal"
          onClick={handleGenerateMealPlan}
          disabled={!Goals.trim()} // Disable if Goals is empty or just spaces
        />
      </div>
    </div>
  );
};

export default Question8;
