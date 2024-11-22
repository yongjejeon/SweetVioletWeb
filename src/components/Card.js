import React from 'react';

const Card = ({ title, questions }) => {
  // Load Google Fonts (Add this import to your App or index.html)
  const cardStyle = {
    backgroundColor: '#90a5a0', // Pale purple background
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    maxWidth: '600px',
    margin: '0px auto',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif', // Use Roboto for the body
  };

  const titleStyle = {
    fontSize: '2rem', // Increased font size
    marginBottom: '15px',
    color: 'white', // Updated title color
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif', // Poppins for the title
  };
  
  const questionContainerStyle = {
    backgroundColor: '#f0f4f3', // White background for questions
    borderRadius: '8px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '1px',
    paddingBottom: '1px',
    margin: '10px 0',
    textAlign: 'center', // Center question text
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const questionTextStyle = {
    fontSize: '1rem',
    color: '#706788',
    fontFamily: 'Roboto, sans-serif', // Using Roboto for questions
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{title}</h2>
      {questions.map((question, index) => (
        <div key={index} style={questionContainerStyle}>
          <p style={questionTextStyle}>{question}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
