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
      <button
        style={styles.button}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        }}
        onClick={handleButtonClick}
      >
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
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};

export default WelcomePage;
