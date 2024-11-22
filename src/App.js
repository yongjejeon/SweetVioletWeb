// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SignInHeader from './components/SignInHeader';
import Preferences from './pages/Preferences';
import WelcomeScreen from './pages/WelcomScreen';
import MealPlanDetailV2 from './pages/MealPlanDetailV2'; // Import the new MealPlanDetailV2
import MealPlanV2 from './pages/MealPlanV2';
import Question0 from './pages/Question0';
import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Question3 from './pages/Question3';
import Question4 from './pages/Question4';
import Question5 from './pages/Question5';
import Question6 from './pages/Question6';
import Question7 from './pages/Question7';
import Question8 from './pages/Question8';
import SignIn from './pages/SignIn';
import { AppProvider } from './AppContext';
import HowToCook from './pages/HowToCook';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render headers based on the route */}
      {location.pathname === '/' ? (
        <SignInHeader title="Sweet Violet" />
      ) : (
        <Header
          title="Sweet Violet"
          navItems={[
            { label: 'WelcomeScreen', href: '/welcomescreen' },
            { label: 'Meal Plan V2', href: '/meal-plan-v2' },
          ]}
        />
      )}
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/welcomescreen" element={<WelcomeScreen />} />
        <Route path="/Question0" element={<Question0/>} />
        <Route path="/Question1" element={<Question1/>} />
        <Route path="/Question2" element={<Question2/>} />
        <Route path="/Question3" element={<Question3/>} />
        <Route path="/Question4" element={<Question4/>} />
        <Route path="/Question5" element={<Question5/>} />
        <Route path="/Question6" element={<Question6/>} />
        <Route path="/Question7" element={<Question7/>} />
        <Route path="/Question8" element={<Question8/>} />
        <Route path="/meal-plan-v2" element={<MealPlanV2 />} />
        <Route path="/meal-plan/:day" element={<MealPlanDetailV2 />} /> {/* Updated route */}
        <Route path="/how-to-cook" element={<HowToCook />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div style={{ backgroundColor: '#f4f8f7', minHeight: '100vh' }}> {/* Set background color here */}
          <AppContent /> {/* Place AppContent inside the Router */}
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
