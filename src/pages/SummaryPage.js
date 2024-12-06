import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAppContext } from '../AppContext';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '600px',
};
const center = {
  lat: 40.7128, // Default center (e.g., New York City)
  lng: -74.006,
};

const SummaryPage = () => {
  const { mealDetails } = useAppContext();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null); // Reference to the Google Map
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load the Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleLoad = useCallback((loadedMap) => {
    setMap(loadedMap);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        loadedMap.panTo(location); // Center map on user's location

        searchTraderJoes(location, loadedMap); // Search for Trader Joe's
      },
      (error) => {
        console.error('Error fetching location:', error);
        alert('Error fetching your location.');
      }
    );
  }, []);

  const searchTraderJoes = (location, loadedMap) => {
    const service = new window.google.maps.places.PlacesService(loadedMap);

    const request = {
      location,
      radius: 5000, // Search within a 5km radius
      keyword: "Trader Joe's", // Search for Trader Joe's
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setStores(
          results.map((place) => ({
            name: place.name,
            vicinity: place.vicinity,
            location: place.geometry.location,
            placeId: place.place_id,
          }))
        );
      } else {
        alert('No Trader Joe\'s locations found nearby.');
      }
    });
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store); // Highlight the selected store
  };

  const handleIngredientClick = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;
    setIngredients(updatedIngredients);
    calculateTotalPrice(updatedIngredients);
  };

  const calculateTotalPrice = (ingredients) => {
    const total = ingredients
      .filter((ingredient) => ingredient.checked)
      .reduce((sum, ingredient) => sum + (ingredient.price || 0), 0);
    setTotalPrice(total);
  };

  const handlePrint = () => {
    const serializableStore = selectedStore
      ? {
          name: selectedStore.name,
          vicinity: selectedStore.vicinity,
          lat: selectedStore.location.lat(),
          lng: selectedStore.location.lng(),
        }
      : null;

    navigate('/print', {
      state: {
        ingredients: ingredients.filter((ingredient) => ingredient.checked),
        totalPrice,
        selectedStore: serializableStore,
      },
    });
  };

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', backgroundColor: '#F9F9F9' }}>
      {/* Left Section: Map */}
      <div style={{ flex: 2, backgroundColor: '#F9F9F9', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <h2 style={{ color: '#6A4C9C' }}>Trader Joe's Nearby</h2>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={userLocation || center}
          onLoad={handleLoad}
        >
          {/* User's location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              title="Your Location"
            />
          )}

          {/* Trader Joe's markers */}
          {stores.map((store, index) => (
            <Marker
              key={index}
              position={store.location}
              title={store.name}
              icon={
                selectedStore && store.placeId === selectedStore.placeId
                  ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' // Highlight selected store
                  : 'http://maps.google.com/mapfiles/kml/shapes/shopping.png'
              }
              onClick={() => handleStoreClick(store)}
            />
          ))}

          {/* Info window for selected store */}
          {selectedStore && (
            <InfoWindow
              position={selectedStore.location}
              onCloseClick={() => setSelectedStore(null)}
            >
              <div>
                <h3>{selectedStore.name}</h3>
                <p>{selectedStore.vicinity}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Right Section: Ingredient List */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', maxHeight: '800px', overflowY: 'auto' }}>
        <h3 style={{ color: '#6A4C9C' }}>Your Order Summary</h3>
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            onClick={() => handleIngredientClick(index)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              backgroundColor: ingredient.checked ? '#E6D9F3' : '#F9F9F9',
              borderRadius: '12px',
              marginBottom: '15px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                color: ingredient.name === 'none' ? '#B0B0B0' : (ingredient.greyedOut ? '#B0B0B0' : '#4A3070'),
                textDecoration: ingredient.greyedOut ? 'line-through' : 'none',
              }}
            >
              {ingredient.name}
            </span>
            <span style={{ color: '#4A3070', fontWeight: 'bold' }}>
              {ingredient.price ? `$${parseFloat(ingredient.price).toFixed(2)}` : 'Price not available'}
            </span>
          </div>
        ))}
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A3070', marginTop: '20px', textAlign: 'right' }}>
          Total Price: ${totalPrice.toFixed(2)}
        </div>
        <Button label="Print Summary" onClick={handlePrint} style={{ marginTop: '20px', backgroundColor: '#4A3070', color: '#fff' }} />
      </div>
    </div>
  );
};

export default SummaryPage;