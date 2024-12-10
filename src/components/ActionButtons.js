import React from 'react';

const ActionButtons = ({ buttons }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Center the buttons container
        alignItems: 'center', // Vertically align items
        gap: '400px', // Add spacing between buttons
        width: '100%', // Full width container
        maxWidth: '1200px', // Limit max width for better design
        margin: '0 auto', // Center the container horizontally
        padding: '0 20px', // Add padding near edges
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
            width: '120px', // Set fixed width for each button container
            height: '150px', // Set fixed height for consistent sizing
          }}
        >
          <img
            src={button.imageSrc}
            alt={button.alt || button.label}
            style={{
              width: '80px', // Set consistent image width
              height: '80px', // Set consistent image height
              objectFit: 'cover',
              borderRadius: '10px', // Optional: Rounded corners
              transition: 'transform 0.3s ease', // Smooth transition for hover effect
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
                textAlign: 'center', // Center text alignment
                wordWrap: 'break-word', // Handle long text
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
