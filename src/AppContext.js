import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext); // Custom hook for easier access

export const AppProvider = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [gender, setGender] = useState([]);
  const [activityLevel, setActivityLevel] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [dietaryRestriction, setDietaryRestriction] = useState('');
  const [preferredCuisine, setPreferredCuisine] = useState('');
  const [Goals, setGoals] = useState('');
  const [mealData, setMealData] = useState(null);
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Add new state for tracking the navigation flag
  const [navigationFromQuestion8, setNavigationFromQuestion8] = useState(false);

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
        dietaryRestriction,
        setDietaryRestriction,
        preferredCuisine,
        setPreferredCuisine,
        height,
        setHeight,
        mealData,
        setMealData,
        mealDetails,
        setMealDetails,
        loading,
        gender,
        setGender,
        Goals,
        setGoals,
        setLoading,
        // Add navigation flag and its setter
        navigationFromQuestion8,
        setNavigationFromQuestion8,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; // Export default context
