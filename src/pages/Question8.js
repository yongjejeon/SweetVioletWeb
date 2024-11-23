import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';

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

  const goToMealPlans = () => {
    navigate('/meal-plan-v2');
  };
  const handleGenerateMealPlan = async () => {
    setLoading(true); // Show loading while fetching data

    const fetchMealPlans = async () => {
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

    await fetchMealPlans(); // Call the fetch function
    navigate('/Question0'); // Navigate after fetching the meal plan
  };

  return (
    <div className="container">
      <h1 className="title">Do You Have Any Other Goals You Want To Achieve?</h1>
      <div className="input-item">
        <input
          type="text"
          value={Goals}
          onChange={(e) => setGoals(e.target.value)} // Update context state
          placeholder="Enter your goals here..."
          className="input-field"
        />
      </div>
      <Button className="button" label="Prev" onClick={goToQuestion7} />
      <Button 
        className="button" 
        label="Generate Meal" 
        onClick={goToMealPlans} 
        disabled={!Goals.trim()} // Disable if Goals is empty or just spaces
      />
    </div>
  );
};

export default Question8;
