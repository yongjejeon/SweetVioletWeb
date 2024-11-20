// src/pages/Preferences.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';

const Question0 = () => {
  const {
    gender,
    setGender,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion1 = () => {
    navigate('/Question1');
  };

  return (
    <div className="container">
      <h1 className="Question1">What Is Your Gender?</h1>
      <div className="selector">
        <Selector options={['Male', 'Female']} onSelect={setGender} multiple={true} />
      </div> 
      <Button className="button" label="Next" onClick={goToQuestion1} disabled={!gender || gender.length === 0} />
    </div>
  );
};

export default Question0;
