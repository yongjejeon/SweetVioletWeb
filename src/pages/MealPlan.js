// src/pages/MealPlan.js
import Button from '../components/Button';
import AppContext from '../AppContext'; //this js file stores the inputs from Preferences.js
import React, { useContext } from 'react';

const MealPlan = () => { //add this to access inputs
  const {
    selectedMeals,
    setSelectedMeals,
    selectedGoal,
    setSelectedGoal,
    weight,
    setWeight,
    height,
    setHeight,
  } = useContext(AppContext);

  return (
    
    <div style={{ padding: '20px' }}>
      <h2>Generated Meal Plan for the Week</h2>
      <div>
        {/* Placeholder for the weekly meal plan */}
        <div style={{ display: 'flex', overflowX: 'scroll' }}>
          {[...Array(7).keys()].map((day) => (
            <div key={day} style={{ minWidth: '200px', padding: '10px', border: '1px solid #ccc', marginRight: '10px' }}>
              <h3>Day {day + 1}</h3>
              <p>Breakfast</p>
              <p>Lunch</p>
              <p>Dinner</p>
              <p>$ Expected Price</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Nutrition Overview</h3>
        <p>XXX Calories</p>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>Carbs: Some Number and Percentage</div>
          <div style={{ flex: 1 }}>Protein: Some Number and Percentage</div>
          <div style={{ flex: 1 }}>Fat: Some Number and Percentage</div>
          <div style={{ flex: 1 }}>ETC</div>
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
        <Button label="Select Meal Plan without Ordering" onClick={() => console.log('Select without ordering')} />
        <Button label="Order Meal Plan" onClick={() => console.log('Order meal plan')} />
        <Button label="Regenerate" onClick={() => console.log('Regenerate meal plan')} />
      </div>
      {/*This is how you can access weight*/}
      <div>
        const { weight } = useContext(AppContext); 
      </div>
      <div style={{ padding: '20px' }}>
          <p>Current weight (from context): {weight} kg</p>
      </div>
    </div>
  );
};

export default MealPlan;