// src/pages/MealPlan.js
import Button from '../components/Button';
import AppContext from '../AppContext'; //this js file stores the inputs from Preferences.js
import React, { useContext } from 'react';
import './MealPlan.css';

const MealPlan = () => { //add this to access inputs
  /*const {
    selectedMeals,
    setSelectedMeals,
    selectedGoal,
    setSelectedGoal,
    weight,
    setWeight,
    height,
    setHeight,
  } = useContext(AppContext);
  */
  return (
    <div style={{ padding: '20px' }}>
      {/* Header with Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginLeft: '130px' }}>Generated Meal Plan for the Week</h2>
      </div>

      {/* Scrollable Meal Plan Section */}
      <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {[... Array(7).keys()].map((day) => (
          <div key={day} style={{ minWidth: '200px', padding: '20px', border: '1px solid #ccc', marginRight: '10px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
            <h3>Day {day +1} </h3>
            <p>Breakfast:</p>
            <p>Lunch: </p>
            <p>Dinner: </p>
            <p>$ Expected Price: </p>
          </div>
        ))}
      </div>

      {/* Nutrition Overview Section */}
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', textAlign: 'center', backgroundColor: '#e0e0e0' }}>
        <h3>Nutrition Overview</h3>
        <p>XXX Calories</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#d0d0d0' }}>
          <div style={{ flex: 1, padding: '10px', backgroundColor: '#c0c0c0' }}>Carbs: Some Number and Percentage</div>
          <div style={{ flex: 1, padding: '10px', backgroundColor: '#b0b0b0' }}>Protein: Some Number and Percentage</div>
          <div style={{ flex: 1, padding: '10px', backgroundColor: '#a0a0a0' }}>Fat: Some Number and Percentage</div>
          <div style={{ flex: 1, padding: '10px', backgroundColor: '#909090' }}>ETC</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button label="Select Meal Plan without Ordering" onClick={() => console.log('Select without ordering')} variant="primary" />
        <Button label="Order Meal Plan" onClick={() => console.log('Order meal plan')} variant="primary" />
        <Button label="Regenerate" onClick={() => console.log('Regenerate meal plan')} variant="primary" />
      </div>
    </div>
  );
};

export default MealPlan;
