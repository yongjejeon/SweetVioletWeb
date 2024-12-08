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
  const [dietaryRestriction, setDietaryRestriction] = useState('');
  const [preferredCuisine, setPreferredCuisine] = useState('');
  const [Goals, setGoals] = useState('');
  const [mealData, setMealData] = useState(null);
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Add new state for tracking the navigation flag
  const [navigationFromQuestion8, setNavigationFromQuestion8] = useState(false);
  
  const [selectedEmotionGoal, setSelectedEmotionGoal] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  // New state for Google Maps API key
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [isGoogleMapsKeyLoading, setIsGoogleMapsKeyLoading] = useState(true);

  // Set the Google Maps API key from environment variables
  useEffect(() => {
    setIsGoogleMapsKeyLoading(true);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    
    if (apiKey) {
      setGoogleMapsApiKey(apiKey);
      console.log('Google Maps API Key:', apiKey);
    } else {
      console.error('Google Maps API Key not found in environment variables.');
    }

    setIsGoogleMapsKeyLoading(false);
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
        navigationFromQuestion8,
        setNavigationFromQuestion8,
        selectedEmotionGoal,
        setSelectedEmotionGoal,
        selectedMood,
        setSelectedMood,
        // Add Google Maps API key and loading state
        googleMapsApiKey,
        isGoogleMapsKeyLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
