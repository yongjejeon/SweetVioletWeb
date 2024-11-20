// src/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext); // Custom hook for easier access

export const AppProvider = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [gender, setGender] = useState([]);
  const [activityLevel, setActivityLevel] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [Goals, setGoals] = useState('');
  const [mealData, setMealData] = useState(null);
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchMealPlans();
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedMeals,
        setSelectedMeals,
        selectedGoal,
        setSelectedGoal,
        activityLevel,
        setActivityLevel,
        weight,
        setWeight,
        height,
        setHeight,
        mealData,
        mealDetails,
        loading,
        gender,
        setGender,
        Goals,
        setGoals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
