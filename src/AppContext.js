import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext); // Custom hook for easier access

export const AppProvider = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [mealData, setMealData] = useState(null);
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{
        selectedMeals,
        setSelectedMeals,
        selectedGoal,
        setSelectedGoal,
        weight,
        setWeight,
        height,
        setHeight,
        mealData,
        setMealData,
        mealDetails,
        setMealDetails,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; // Export default context
