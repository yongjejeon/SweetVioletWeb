import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './Questions.css'; // Import the shared CSS file

const Question5 = () => {
  const { weight, setWeight } = useContext(AppContext);
  const navigate = useNavigate();

  const goToQuestion6 = () => {
    navigate('/Question6');
  };

  const goToQuestion4 = () => {
    navigate('/Question4');
  };

  const data = [
    {
      title: 'What Is Your Weight?',
    },
  ];

  return (
    <div className="page-wrapper"> {/* Add page-wrapper for centering */}
      <div className="container">
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          <div>
            <Input  
              value={weight} 
              onChange={setWeight} 
              placeholder="Enter your weight (lbs)" 
              type="number" 
              max={500} // Max weight set to 500 lbs
            />
          </div>
        </div>

        <div className="button-container">
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion4}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion6}
            disabled={!weight}
          />
        </div>
      </div>
    </div>
  );
};

export default Question5;
