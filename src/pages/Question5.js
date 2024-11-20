// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Input from '../components/Input';
import Button from '../components/Button';
import weightIcon from '../images/weight-icon.png';


const Question5 = () => {
  const {
    weight,
    setWeight,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion6 = () => {
    navigate('/Question6');
  };
  const goToQuestion4 = () => {
    navigate('/Question4');
  };

  return (
    <div className="container">
      <h1 className="title">What Is Your Height?</h1>
        <div className="input-item">
        <img src={weightIcon} alt="Weight Icon" className="input-icon" />
          <Input label="Weight" value={weight} onChange={setWeight} placeholder="Enter your weight" />
      </div>
      <Button className="button" label="Prev" onClick={goToQuestion4}/>
      <Button className="button" label="Next" onClick={goToQuestion6} disabled={!weight} />
    </div>
  );
};

export default Question5;
