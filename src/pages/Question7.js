// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';


const Question7 = () => {
  const {
    weight,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion6 = () => {
    navigate('/Question6');
  };
  const goToQuestion8 = () => {
    navigate('/Question8');
  };

  return (
    <div className="container">
      <h1 className="title">What Is Your Prefered Cuisine?</h1>
      <div className="input-item">
      </div>
      <Button className="button" label="Prev" onClick={goToQuestion6}/>
      <Button className="button" label="Next" onClick={goToQuestion8}/>
    </div>
  );
};

export default Question7;
