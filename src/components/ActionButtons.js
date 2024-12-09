import React from 'react';

const ActionButtons = ({ buttons }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between', // Dynamically space items
        alignItems: 'center', // Vertically center items
        width: '100%', // Ensure full-width container
        maxWidth: '1200px', // Optional: Limit max width for better design
        margin: '0 auto', // Center the container horizontally
        padding: '0 20px', // Add padding for spacing near edges
      }}
    >
      {buttons.map((button, index) => (
        <div
          key={index}
          onClick={button.onClick}
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={button.imageSrc}
            alt={button.alt || button.label}
            style={{
              width: '100px', // Set image width
              height: '100px', // Set image height
              objectFit: 'cover',
              borderRadius: '10px', // Optional: Rounded corners
              transition: 'transform 0.3s ease', // Smooth transition
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'; // Slightly enlarge image
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'; // Reset image size
            }}
          />
          {button.label && (
            <span
              style={{
                marginTop: '10px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#574284',
              }}
            >
              {button.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActionButtons;
