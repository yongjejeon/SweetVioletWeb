// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';


const Question2 = () => {
  const {
    selectedGoal,
    setSelectedGoal,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion3 = () => {
    navigate('/Question3');
  };

  const goToQuestion1 = () => {
    navigate('/Question1');
  };

  return (
    <div className="container">
      <h1 className="title">What Are Your Goals?</h1>
      <div className="selector">
        <Selector options={['Maintain', 'Bulk', 'Cut']} onSelect={setSelectedGoal} multiple={false} />
      </div>
      <Button className="button" label="Prev" onClick={goToQuestion1} />
      <Button className="button" label="Next" onClick={goToQuestion3} disabled={!selectedGoal || selectedGoal.length === 0} />
    </div>
  );
};

export default Question2;
