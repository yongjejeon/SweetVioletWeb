import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeVideo from '../images/Welcome.mp4'; // Correctly importing the video file

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/question0");
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
    height: "100vh",
    backgroundColor: "#f8f8ff",
  },
  video: {
    width: "80%",
    maxWidth: "600px",
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
