// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';

const Question1 = () => {
  const {
    selectedMeals,
    setSelectedMeals,
    selectedGoal,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion2 = () => {
    navigate('/Question2');
  };

  const goToQuestion0 = () => {
    navigate('/Question0');
  };

  
  return (
    <div className="container">
      <h1 className="Question1">What Meals Do You Want To Prep For?</h1>
      <div className="selector">
        <Selector options={['Breakfast', 'Lunch', 'Dinner']} onSelect={setSelectedMeals} multiple={true} />
      </div> 
      <Button className="button" label="Prev" onClick={goToQuestion0}/>
      <Button className="button" label="Next" onClick={goToQuestion2} disabled={!selectedMeals || selectedMeals.length === 0} />
    </div>
  );
};

export default Question1;
