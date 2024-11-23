import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const SummaryPage = () => {
  const mapRef = useRef(null); // Reference for the map container
  const [stores, setStores] = useState([]); // State to store nearby Trader Joe's locations
  const [selectedStore, setSelectedStore] = useState(null); // State to store selected store
  const [ingredients, setIngredients] = useState([
    { name: 'Salt', price: 1.0, checked: true },
    { name: 'Pepper', price: 1.5, checked: true },
    { name: 'Ingredient 1', price: 2.0, checked: true },
    { name: 'Ingredient 2', price: 3.0, checked: true },
  ]); // State for ingredients
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const navigate = useNavigate(); // For navigation to the printing page

  const loadGoogleMapsScript = () => {
    const existingScript = document.getElementById('googleMaps');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.id = 'googleMaps';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps API loaded.');
        initMap();
      };
      document.body.appendChild(script);
    } else {
      initMap();
    }
  };

  const initMap = () => {
    if (!window.google) {
      console.error('Google Maps API failed to load.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = new google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
        });

        new google.maps.Marker({
          position: userLocation,
          map,
          title: 'Your Location',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
        });

        const request = {
          location: userLocation,
          radius: 5000,
          keyword: "Trader Joe's",
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setStores(
              results.map((place) => ({
                name: place.name,
                vicinity: place.vicinity,
                location: place.geometry.location,
                placeId: place.place_id,
              }))
            );

            results.forEach((place, index) => {
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
                icon: {
                  url: 'http://maps.google.com/mapfiles/kml/shapes/shopping.png',
                },
              });

              marker.addListener('click', () => {
                setSelectedStore(place); // Set the selected store
              });
            });
          } else {
            alert("No Trader Joe's locations found nearby.");
          }
        });
      },
      (error) => {
        alert('Error fetching location: ' + error.message);
      }
    );
  };

  const handleCheckboxChange = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;
    setIngredients(updatedIngredients);
    calculateTotalPrice(updatedIngredients);
  };

  const calculateTotalPrice = (ingredients) => {
    const total = ingredients
      .filter((ingredient) => ingredient.checked)
      .reduce((sum, ingredient) => sum + ingredient.price, 0);
    setTotalPrice(total);
  };

  const handlePrint = () => {
    const serializableStore = selectedStore
      ? {
          name: selectedStore.name,
          vicinity: selectedStore.vicinity,
          lat: selectedStore.geometry.location.lat(), // Extract latitude
          lng: selectedStore.geometry.location.lng(), // Extract longitude
        }
      : null;
  
    // Navigate with fully serializable state
    navigate('/print', {
      state: {
        ingredients: ingredients.filter((ingredient) => ingredient.checked),
        totalPrice,
        selectedStore: serializableStore,
      },
    });
  };

  useEffect(() => {
    loadGoogleMapsScript();
    calculateTotalPrice(ingredients);
  }, []);

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
      {/* Left Section: Map */}
      <div style={{ flex: 2 }}>
        <h2>Trader Joe's Nearby</h2>
        <div
          id="map"
          ref={mapRef}
          style={{
            height: '600px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        ></div>
        {selectedStore && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h4>Selected Store:</h4>
            <p>
              <strong>{selectedStore.name}</strong>
              <br />
              {selectedStore.vicinity}
            </p>
          </div>
        )}
      </div>

      {/* Right Section: Ingredient List */}
      <div style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Your Order Summary</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={`ingredient-${index}`}
                checked={ingredient.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`ingredient-${index}`}>
                {' '}
                {ingredient.name} - ${ingredient.price.toFixed(2)}
              </label>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Total Price: ${totalPrice.toFixed(2)}</p>

        {/* Buttons */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <Button label="Print Ingredient List" onClick={handlePrint} variant="primary" />
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;