import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Input from '../components/Input';
import Button from '../components/Button';
import './Preferences.css';
import heightIcon from '../images/height-icon.png';
import weightIcon from '../images/weight-icon.png';

const Preferences = () => {
  const {
    selectedMeals,
    setSelectedMeals,
    selectedGoal,
    setSelectedGoal,
    weight,
    setWeight,
    height,
    setHeight,
    setMealData,
    setMealDetails,
    setLoading,
  } = useContext(AppContext);

  const API_URL = 'https://moodmeals-backend-1011833328775.us-central1.run.app'
  const navigate = useNavigate();

  const handleGenerateMealPlan = async () => {
    setLoading(true); // Show loading while fetching data

    const fetchMealPlans = async () => {
      try {
        const response = await fetch(`${API_URL}/meal_plans/`);
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

    await fetchMealPlans(); // Call the fetch function
    navigate('/Question0'); // Navigate after fetching the meal plan
  };

  return (
    <div className="preference-container">
      <h1 className="preference-title">Preferences</h1>
      <div className="selector">
        <Selector options={['Breakfast', 'Lunch', 'Dinner']} onSelect={setSelectedMeals} multiple={true} />
      </div>
      <div className="selector">
        <Selector options={['Maintain', 'Bulk', 'Cut']} onSelect={setSelectedGoal} multiple={false} />
      </div>
      <div className="input-container">
        <div className="input-item">
          <img src={heightIcon} alt="Height Icon" className="input-icon" />
          <Input label="Height" value={height} onChange={setHeight} placeholder="Enter your height" />
        </div>
        <div className="input-item">
          <img src={weightIcon} alt="Weight Icon" className="input-icon" />
          <Input label="Weight" value={weight} onChange={setWeight} placeholder="Enter your weight" />
        </div>
      </div>
      <Button 
        className="button" 
        label="Generate Meal Plan" 
        onClick={handleGenerateMealPlan} 
        disabled={!selectedGoal || selectedMeals.length === 0} 
      />
    </div>
  );
};

export default Preferences;
