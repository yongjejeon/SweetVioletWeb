// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';


const Question6 = () => {
  const {
    weight,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion5 = () => {
    navigate('/Question5');
  };
  const goToQuestion7 = () => {
    navigate('/Question7');
  };

  return (
    <div className="container">
      <h1 className="title">What Is Your Dietary Restriction?</h1>
      <div className="input-item">
      </div>
      <Button className="button" label="Prev" onClick={goToQuestion5}/>
      <Button className="button" label="Next" onClick={goToQuestion7}/>
    </div>
  );
};

export default Question6;
