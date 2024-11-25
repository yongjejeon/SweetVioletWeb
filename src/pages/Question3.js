import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import './Questions.css'; // Import the shared CSS file

const Question3 = () => {
  const { activityLevel, setActivityLevel } = useContext(AppContext);
  const navigate = useNavigate();

  const goToQuestion4 = () => {
    navigate('/Question4');
  };

  const goToQuestion2 = () => {
    navigate('/Question2');
  };

  const data = [
    {
      title: 'What Is Your Activity Level?',
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Mimic the card for Selector */}
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          {/* Add the Selector inside the styled box */}
          <div>
            <Selector
              options={['Minimal', 'Moderate', 'Very Active']}
              onSelect={setActivityLevel}
              multiple={false}
            />
          </div>
        </div>

        {/* Button container to display Prev and Next buttons horizontally */}
        <div className="button-container">
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion2}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion4}
            disabled={!activityLevel || activityLevel.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Question3;
