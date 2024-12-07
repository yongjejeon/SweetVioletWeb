import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAppContext } from '../AppContext';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '600px',
};
const center = { lat: 40.7128, lng: -74.006 }; // Default location (NYC)

const SummaryPage = () => {
  const { mealDetails } = useAppContext();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = 'https://moodmeals-backend-1011833328775.us-central1.run.app' 

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Handle map load
  const handleLoad = useCallback((map) => {
    mapRef.current = map;

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        map.panTo(location);
        searchTraderJoes(location, map);
      },
      (error) => alert('Error fetching your location.')
    );
  }, []);

  // Search for Trader Joe's locations
  const searchTraderJoes = (location, map) => {
    if (!window.google || !window.google.maps) {
      alert('Google Maps API not loaded properly.');
      return;
    }

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location,
      radius: 5000,
      keyword: "Trader Joe's",
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

  // Handle store selection
  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  // Calculate total price
  const calculateTotalPrice = (ingredients) => {
    const total = ingredients
      .filter((ingredient) => ingredient.checked)
      .reduce((sum, ingredient) => sum + (ingredient.price || 0), 0);
    setTotalPrice(total);
  };

  // Handle ingredient toggle
  const handleIngredientClick = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;
    setIngredients(updatedIngredients);
    calculateTotalPrice(updatedIngredients);
  };

  // Handle print
  const handlePrint = () => {
    const serializableStore = selectedStore
      ? {
          name: selectedStore.name,
          vicinity: selectedStore.vicinity,
          lat: selectedStore.location?.lat?.() || null,
          lng: selectedStore.location?.lng?.() || null,
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
  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ') // Split string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(' '); // Join back the words into a single string
  };
  // Convert to Trader Joe's Items
  const handleConvertToTraderJoesIngredients = async () => {
    if (!selectedStore) {
      alert('Please select a Trader Joe\'s store first.');
      return;
    }

    const ingredientNames = ingredients.map((ingredient) => ingredient.name);

    try {
      const response = await fetch(`${API_URL}/get-matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientNames }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matching ingredients');
      }

      const data = await response.json();

      
      const updatedIngredients = await Promise.all(
        ingredients.map(async (ingredient) => {
          const newName = data.results[ingredient.name] || 'none';
          if (newName === 'none') {
            return { ...ingredient, greyedOut: true };
          } else {
            try {
              const searchResponse = await fetch(
                `${API_URL}/items/search/?item_title=${encodeURIComponent(
                  newName
                )}`,
                { method: 'GET' }
              );

              if (!searchResponse.ok) {
                throw new Error(`Failed to fetch price for ${newName}`);
              }

              const searchData = await searchResponse.json();
              const retailPrice = searchData[0]?.retail_price || 0;

              return {
                ...ingredient,
                name: newName,
                price: parseFloat(retailPrice) || 0,
                greyedOut: false,
              };
            } catch (error) {
              console.error(`Error fetching price for ${newName}:`, error);
              return { ...ingredient, name: newName, price: 0, greyedOut: false };
            }
          }
        })
      );

      setIngredients(updatedIngredients);
      calculateTotalPrice(updatedIngredients);
    } catch (error) {
      console.error('Error fetching matches:', error);
      alert('Error fetching Trader Joe\'s ingredient matches.');
    }
  };

  // Extract ingredients
  useEffect(() => {
    if (mealDetails && mealDetails.length > 0) {
      const allIngredients = mealDetails.flatMap((day) =>
        day.meals.flatMap((meal) =>
          meal.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: '',
            checked: true,
          }))
        )
      );

      const uniqueIngredients = [];
      const ingredientNames = new Set();

      allIngredients.forEach((ingredient) => {
        if (!ingredientNames.has(ingredient.name)) {
          ingredientNames.add(ingredient.name);
          uniqueIngredients.push(ingredient);
        }
      });

      setIngredients(uniqueIngredients);
      calculateTotalPrice(uniqueIngredients);
    }
  }, [mealDetails]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Left: Map */}
      <div style={{ flex: 2 }}>
        <h2>Trader Joe's Nearby</h2>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || center}
          zoom={14}
          onLoad={handleLoad}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              title="Your Location"
            />
          )}

          {stores.map((store, index) => (
            <Marker
              key={index}
              position={store.location}
              onClick={() => handleStoreClick(store)}
              icon={
                selectedStore?.placeId === store.placeId
                  ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  : 'http://maps.google.com/mapfiles/kml/shapes/shopping.png'
              }
            />
          ))}

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
        {/* Button to convert to Trader Joe's ingredients */}
        <Button
        label="Convert to Trader Joe's Ingredients"
        onClick={handleConvertToTraderJoesIngredients}
        style={{
          marginTop: '10px',
          backgroundColor: '#4A3070',
          color: '#fff',
          padding: '10px 15px',
          borderRadius: '5px',
        }}
      />
      </div>

      {/* Right Section: Ingredient List */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' , maxHeight: '800px', 
               overflowY: 'auto', }}>
        <h3 style={{ color: '#6A4C9C' }}>Your Order Summary</h3>
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            onClick={() => handleIngredientClick(index)} // Toggle checked state on row click
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
                textDecoration: ingredient.greyedOut ? 'line-through' : 'none', // Optional: line-through effect for greyed-out items
              }}
            >
              {capitalizeFirstLetter(ingredient.name)}
            </span>

            <span style={{ color: '#4A3070', fontWeight: 'bold' }}>
              {ingredient.price ? `$${parseFloat(ingredient.price).toFixed(2)}` : 'Price not available'}
            </span>

          </div>
        ))}


        {/* Total Price */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#4A3070',
            marginTop: '20px',
            textAlign: 'right',
          }}
        >
          Total Price: ${totalPrice.toFixed(2)}
        </div>

        {/* Print Summary Button */}
        <Button label="Print Summary" onClick={handlePrint} style={{ marginTop: '20px', backgroundColor: '#4A3070', color: '#fff' }} />
      </div>
    </div>
  );
};

export default SummaryPage;
