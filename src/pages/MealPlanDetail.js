// src/pages/MealPlanDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MealPlanDetail = () => {
  const { day } = useParams(); // Get the current day from the URL
  const navigate = useNavigate();
  const currentDay = parseInt(day, 10); // Convert day to an integer for navigation

  // Handlers for navigating to previous and next days
  const handlePreviousDay = () => {
    if (currentDay > 1) {
      navigate(`/meal-plan/${currentDay - 1}`);
    }
  };

  const handleNextDay = () => {
    if (currentDay < 7) {
      navigate(`/meal-plan/${currentDay + 1}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Meal Plan Details for Day {currentDay}</h2>

      {/* Navigation Arrows */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
        <button onClick={handlePreviousDay} disabled={currentDay === 1} style={{ cursor: currentDay === 1 ? 'not-allowed' : 'pointer' }}>
          ← Previous
        </button>
        <button onClick={handleNextDay} disabled={currentDay === 7} style={{ cursor: currentDay === 7 ? 'not-allowed' : 'pointer' }}>
          Next →
        </button>
      </div>

      {/* Display detailed information for the selected day */}
      <p>Here you can display specific meal details for Day {currentDay}.</p>
    </div>
  );
};

export default MealPlanDetail;
