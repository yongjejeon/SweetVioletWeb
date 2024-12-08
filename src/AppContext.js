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

  // API URL for fetching Google Maps key
  const API_URL = 'https://moodmeals-backend-1011833328775.us-central1.run.app';

  useEffect(() => {
    const fetchGoogleMapsApiKey = async () => {
      try {
        setIsGoogleMapsKeyLoading(true);
        const response = await fetch(`${API_URL}/api/google-maps-key/`);
        if (!response.ok) {
          throw new Error('Failed to fetch Google Maps API key');
        }
        const data = await response.json();
        
        // Add more detailed logging
        console.log('Fetched API Key Response:', data);
        console.log('Actual API Key:', data.googleMapsApiKey);
  
        setGoogleMapsApiKey(data.googleMapsApiKey);
      } catch (error) {
        console.error('Error fetching Google Maps API key:', error);
      } finally {
        setIsGoogleMapsKeyLoading(false);
      }
    };
  
    fetchGoogleMapsApiKey();
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