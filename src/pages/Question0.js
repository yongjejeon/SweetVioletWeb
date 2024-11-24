import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import './Questions.css';

const Question0 = () => {
  const { gender, setGender } = useContext(AppContext);
  const navigate = useNavigate();

  const goToQuestion1 = () => {
    navigate('/Question1');
  };

  const goToQuestionE = () => {
    navigate('/QuestionEmotion');
  };

  const data = [
    {
      title: 'What Is Your Sex?',
    },
  ];

  return (
    <div className="container">
      {/* Mimic the card for Selector */}
      <div className="card">
        <h2 className="card-title">{data[0].title}</h2>
        {/* Add the Selector inside the styled box */}
        <div>
          <Selector
            options={['Male', 'Female']}
            onSelect={setGender}
            multiple={false}
          />
        </div>
      </div>
      
      <div style={buttonContainerStyle}>
        <Button
          className="button"
          label="Prev"
          onClick={goToQuestionE}
        />
        <Button
          className="button"
          label="Next"
          onClick={goToQuestion1}
          disabled={!gender}
        />
      </div>
    </div>
  );
};

export default Question0;
