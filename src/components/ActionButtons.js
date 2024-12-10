import React from 'react';

const ActionButtons = ({ buttons }) => {
  return (
    <footer
      style={{
        position: 'fixed', // Stick the footer to the bottom of the screen
        bottom: 0, // Align to the bottom
        left: 0,
        width: '100%', // Full-width footer
        backgroundColor: '#f9f9f9', // Background color
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow
        padding: '10px 0', // Reduced padding for a thinner footer
        zIndex: 1000, // Ensure it's above other elements
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '400px', // Adjust gap between buttons
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
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
              width: '100px', // Reduced button container size
              height: '100px',
            }}
          >
            <img
              src={button.imageSrc}
              alt={button.alt || button.label}
              style={{
                width: '60px', // Smaller image size
                height: '60px',
                objectFit: 'cover',
                borderRadius: '10px',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
            {button.label && (
              <span
                style={{
                  marginTop: '5px', // Reduced spacing
                  fontSize: '12px', // Smaller font
                  fontWeight: 'bold',
                  color: '#574284',
                  textAlign: 'center',
                }}
              >
                {button.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default ActionButtons;
