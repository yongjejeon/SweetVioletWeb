// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';


const Question3= () => {
  const {
    activityLevel,
    setActivityLevel,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion4 = () => {
    navigate('/Question4');
  };

  const goToQuestion2 = () => {
    navigate('/Question2');
  };

  return (
    <div className="preference">
      <h1 className="title">What Is Your Activity Level?</h1>
      <div className="selector">
        <Selector options={['Minimal', 'Moderate', 'Very Active']} onSelect={setActivityLevel} multiple={false} />
      </div>
      <Button className="button" label="Prev" onClick={goToQuestion2}/>
      <Button className="button" label="Next" onClick={goToQuestion4} disabled={!activityLevel || activityLevel.length === 0} />

    </div>
  );
};

export default Question3;
