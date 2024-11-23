import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PrintPage = () => {
  const location = useLocation();
  const { ingredients, totalPrice, selectedStore } = location.state || {};

  useEffect(() => {
    // Trigger the browser's print dialog when the page loads
    window.print();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Ingredient List</h2>
      {selectedStore && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Selected Store:</h3>
          <p>
            <strong>{selectedStore.name}</strong>
            <br />
            {selectedStore.vicinity}
            <br />
            <strong>Location:</strong> ({selectedStore.lat}, {selectedStore.lng})
          </p>
        </div>
      )}
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - ${ingredient.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p style={{ fontWeight: 'bold' }}>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default PrintPage;