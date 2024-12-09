import React from "react";
import { useNavigate } from "react-router-dom";
import title1 from "../images/title3.png"; // Importing the background image
import WelcomeVideo from "../images/Welcome.mov"; // Importing the video file

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/QuestionEmotion");
  };

  return (
    <div style={styles.container}>
      {/* Left Section with Image */}
      <div style={styles.leftSection}>
        <img src={title1} alt="Meal Table" style={styles.image} />
      </div>

      {/* Right Section with Video and Button */}
      <div style={styles.rightSection}>
        <video style={styles.video} autoPlay loop muted>
          <source src={WelcomeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "90vh",
    backgroundColor: "#f9f9f9",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "auto",
    borderRadius: "10px",
    objectFit: "cover",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    maxWidth: "800px",
    borderRadius: "10px",
    marginBottom: "20px", // Add spacing below the video
  },
  subText: {
    fontSize: "1.5rem",
    color: "#5f5faa",
    marginBottom: "20px",
    textAlign: "center",
  },
  button: {
    padding: "15px 30px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#574284",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};

export default WelcomePage;
