import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PrintPage = () => {
  const location = useLocation();
  const { ingredients, totalPrice, selectedStore } = location.state || {};

  useEffect(() => {
    // Trigger the browser's print dialog when the page loads
    window.print();
  }, []);

  // Helper function to safely format prices
  const formatPrice = (price) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? 'N/A' : parsedPrice.toFixed(2);
  };

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxHeight: '80vh',
        marginTop: '20px',
        overflow: 'auto',
      }}
    >
      <style>
        {`
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            div {
              max-height: none !important;
              overflow: visible !important;
              box-shadow: none !important;
            }
          }
        `}
      </style>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Shopping List</h1>

      {selectedStore && (
        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#fff',
          }}
        >
          <h2 style={{ marginBottom: '10px', color: '#444' }}>Store Information</h2>
          <p style={{ margin: '5px 0' }}>
            <strong>{selectedStore.name}</strong>
          </p>
          <p style={{ margin: '5px 0', color: '#555' }}>{selectedStore.vicinity}</p>
          <p style={{ margin: '5px 0', fontStyle: 'italic' }}>
            <strong>Location:</strong> ({selectedStore.lat}, {selectedStore.lng})
          </p>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#444', borderBottom: '2px solid #ddd', paddingBottom: '5px' }}>
          Ingredients
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 15px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <span>{ingredient.name}</span>
              <span>${formatPrice(ingredient.price)}</span>
            </li>
          ))}
        </ul>
      </div>

      <p
        style={{
          fontWeight: 'bold',
          fontSize: '18px',
          textAlign: 'right',
          color: '#333',
        }}
      >
        Total Price: ${formatPrice(totalPrice)}
      </p>
    </div>
  );
};

export default PrintPage;
