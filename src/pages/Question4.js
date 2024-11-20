// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Input from '../components/Input';
import Button from '../components/Button';
import heightIcon from '../images/height-icon.png';


const Question4 = () => {
  const {
    height,
    setHeight,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion5 = () => {
    navigate('/Question5');
  };
  const goToQuestion3 = () => {
    navigate('/Question3');
  };

  return (
    <div className="container">
      <h1 className="title">What Is Your Height?</h1>
        <div className="input-item">
          <img src={heightIcon} alt="Height Icon" className="input-icon" />
          <Input label="Height" value={height} onChange={setHeight} placeholder="Enter your height" />
      </div>
      <Button className="button" label="Prev" onClick={goToQuestion3}/>
      <Button className="button" label="Next" onClick={goToQuestion5} disabled={!height} />
    </div>
  );
};

export default Question4;
