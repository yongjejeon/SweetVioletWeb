import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './Questions.css'; // Import the shared CSS file

const Question4 = () => {
  const { height, setHeight } = useContext(AppContext);
  const navigate = useNavigate();

  const goToQuestion5 = () => {
    navigate('/Question5');
  };

  const goToQuestion3 = () => {
    navigate('/Question3');
  };

  const data = [
    {
      title: 'What Is Your Height?',
    },
  ];

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">{data[0].title}</h2>
        <div>
          <Input 
            value={height} 
            onChange={setHeight} 
            placeholder="Enter your height (inches)" 
            type="number" 
            max={108} // Max height set to 108 inches (9 feet)
          />
        </div>
      </div>

      <div className="button-container">
        <Button
          className="button"
          label="Prev"
          onClick={goToQuestion3}
        />
        <Button
          className="button"
          label="Next"
          onClick={goToQuestion5}
          disabled={!height}
        />
      </div>
    </div>
  );
};

export default Question4;
