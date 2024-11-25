import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAppContext } from '../AppContext';

const SummaryPage = () => {
  const mapRef = useRef(null);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const { mealDetails, loading } = useAppContext();
  const [ingredients, setIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Load Google Maps API
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

  // Initialize Google Maps
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

            results.forEach((place) => {
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
                icon: {
                  url: 'http://maps.google.com/mapfiles/kml/shapes/shopping.png',
                },
              });

              marker.addListener('click', () => {
                setSelectedStore(place);
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

  // Handle ingredient click (for selecting ingredients)
  const handleIngredientClick = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;
    setIngredients(updatedIngredients);
    calculateTotalPrice(updatedIngredients);
  };

  // Calculate total price of selected ingredients
  const calculateTotalPrice = (ingredients) => {
    const total = ingredients
      .filter((ingredient) => ingredient.checked)
      .reduce((sum, ingredient) => sum + (ingredient.price || 0), 0);
    setTotalPrice(total);
  };

  // Handle the printing of selected ingredients
  const handlePrint = () => {
    const serializableStore = selectedStore
      ? {
          name: selectedStore.name,
          vicinity: selectedStore.vicinity,
          lat: selectedStore.geometry.location.lat(),
          lng: selectedStore.geometry.location.lng(),
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

  // Extract ingredients from mealDetails and filter duplicates
  useEffect(() => {
    loadGoogleMapsScript();

    if (mealDetails && mealDetails.length > 0) {
      // Flatten and extract ingredients from all meals, then filter duplicates by ingredient name
      const allIngredients = mealDetails.flatMap((day) =>
        day.meals.flatMap((meal) =>
          meal.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: "", // Default price is blank
            checked: true, // Default checked state
          }))
        )
      );

      // Remove duplicates based on ingredient name
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

  // Handle "Convert to Trader Joe's Ingredients" button click
  const handleConvertToTraderJoesIngredients = async () => {
    if (!selectedStore) {
      alert('Please select a Trader Joe\'s store first.');
      return;
    }
  
    // Collect the ingredient names
    const ingredientNames = ingredients.map((ingredient) => ingredient.name);
  
    try {
      // Send the POST request to the /get-matches API endpoint
      const response = await fetch('http://127.0.0.1:8000/get-matches', {
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
      console.log('API response:', data);
  
      // Update ingredients with the matched Trader Joe's ingredients
      const updatedIngredients = await Promise.all(
        ingredients.map(async (ingredient) => {
          const newName = data.results[ingredient.name] || "none";
          if (newName === "none") {
            return {
              ...ingredient,
              greyedOut: true,
            };
          } else {
            try {
              // Call the search endpoint to get the retail price
              const searchResponse = await fetch(`http://127.0.0.1:8000/items/search/?item_title=${encodeURIComponent(newName)}`, {
                method: 'GET',
              });
  
              if (!searchResponse.ok) {
                throw new Error(`Failed to fetch price for ${newName}`);
              }
  
              const searchData = await searchResponse.json();
              const retailPrice = searchData[0]?.retail_price || 0; // Assuming the price is in the first result
  
              return {
                ...ingredient,
                name: newName,
                price: parseFloat(retailPrice) || 0, // Ensure price is a number
                greyedOut: false,
              };
            } catch (error) {
              console.error(`Error fetching price for ${newName}:`, error);
              return {
                ...ingredient,
                name: newName,
                price: 0,
                greyedOut: false,
              };
            }
          }
        })
      );
  
      // Update the state with the parsed ingredients
      setIngredients(updatedIngredients);
      calculateTotalPrice(updatedIngredients);
    } catch (error) {
      console.error('Error fetching matches:', error);
      alert('Error fetching Trader Joe\'s ingredient matches.');
    }
  };  
  
  

  // Utility function to capitalize the first letter of each word
  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ') // Split string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(' '); // Join back the words into a single string
  };


  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', backgroundColor: '#F9F9F9'}}>
      {/* Left Section: Map */}
      <div style={{ flex: 2, backgroundColor: '#F9F9F9', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <h2 style={{ color: '#6A4C9C' }}>Trader Joe's Nearby</h2>
        <div
          id="map"
          ref={mapRef}
          style={{
            height: '600px',
            borderRadius: '15px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        ></div>
        {selectedStore && (
          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h4 style={{ color: '#4A3070' }}>Selected Store:</h4>
            <p style={{ color: '#555555' }}>
              <strong>{selectedStore.name}</strong>
              <br />
              {selectedStore.vicinity}
            </p>

            {/* Button to convert to Trader Joe's ingredients */}
            <Button label="Convert to Trader Joe's Ingredients" onClick={handleConvertToTraderJoesIngredients} style={{ marginTop: '10px', backgroundColor: '#4A3070', color: '#fff' }} />
          </div>
        )}
      </div>

      

      {/* Right Section: Ingredient List */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
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
