import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import './Questions.css';

const Question2 = () => {
  const { selectedGoal, setSelectedGoal } = useContext(AppContext);
  const navigate = useNavigate();

  const goToQuestion3 = () => {
    navigate('/Question3');
  };

  const goToQuestion1 = () => {
    navigate('/Question1');
  };

  const data = [
    {
      title: 'What Are Your Goals?',
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
            options={['Maintain', 'Bulk', 'Cut']}
            onSelect={setSelectedGoal}
            multiple={false}
          />
        </div>
      </div>

      {/* Button container to display Prev and Next buttons horizontally */}
      <div className="button-container">
        <Button className="button" label="Prev" onClick={goToQuestion1} />
        <Button
          className="button"
          label="Next"
          onClick={goToQuestion3}
          disabled={!selectedGoal || selectedGoal.length === 0}
        />
      </div>
    </div>
  );
};

export default Question2;
