import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeVideo from '../images/Welcome.mp4'; // Correctly importing the video file

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/QuestionEmotion");
  };

  return (
    <div style={styles.container}>
      {/* Video Section */}
      <video style={styles.video} autoPlay loop muted>
        <source src={WelcomeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text and Button */}
      <p style={styles.subText}>Generate your Meal for the right Mood!</p>
      <button style={styles.button} onClick={handleButtonClick}>
        Generate Meal!
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    backgroundColor: "#f8f8ff",
  },
  video: {
    width: "100%",
    maxWidth: "800px",
    borderRadius: "10px",
  },
  subText: {
    fontSize: "1.5rem",
    color: "#5f5faa",
    marginTop: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "20px 25px",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#6f2da8",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default WelcomePage;

// import React from 'react';

// import { useNavigate } from 'react-router-dom';
// import Card from '../components/Card';
// import Button from '../components/Button';

// const WelcomeScreen = () => {
//   const navigate = useNavigate();

//   const handleGenerateMealPlan = async () => {
//     navigate('/Question0');
//   }

//   const data = [
//     {
//       title: 'Create Custom Meal Plans',
//       questions: [
//         'We generate a meal plan tailored to you and your dietary goals',
//         'Customize your suggestions based on your allergies and food preferences',
//       ],
//     },
//     {
//       title: 'Generate Trader Joes Shopping Lists',
//       questions: [
//         'Convert your meal plan to a shopping list specific to your local Trader Joes',
//         'Your grocery list will reflect real prices and availability',
//       ],
//     },
//   ];

//   // Style for the main container to fix it 60px from the top
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column', // Stack everything vertically
//     alignItems: 'center', // Center content horizontally
//     position: 'fixed', // Fix the container's position relative to the page
//     top: '60px', // 60px from the top of the page
//     left: '50%', // Center the container horizontally
//     transform: 'translateX(-50%)', // Correct horizontal centering with transform
//     width: '100%', // Make sure the container takes full width
//     boxSizing: 'border-box', // Include padding in the width calculation
//     paddingTop: '20px', // Additional padding at the top
//   };

//   const cardStyle = {
//     width: '100%', // Make the cards take up the full width of the container
//     maxWidth: '600px', // Limit the width to match the button width
//     padding: '10px',
//   };

//   const buttonContainerStyle = {
//     display: 'flex',
//     justifyContent: 'center', // Center the button horizontally
//     width: '100%',
//     padding: '0px 0', // Adds padding above and below the button
//   };

//   const buttonStyle = {
//     width: '100%', // Ensures the button spans the width of the container minus padding
//     maxWidth: '600px', // Limit the maximum width (same as cards)
//     padding: '0px',
//     fontSize: '18px',
//   };

//   return (
//     <div style={containerStyle}>
//       {data.map((item, index) => (
//         <div key={index} style={cardStyle}>
//           <Card title={item.title} questions={item.questions} />
//         </div>
//       ))}
//       <div style={buttonContainerStyle}>
//         <Button 
//           className="button" 
//           label="Generate Meal Plan" 
//           onClick={handleGenerateMealPlan} 
//           style={buttonStyle}
//         />
//       </div>
//     </div>
//   );
// };

// export default WelcomeScreen;
