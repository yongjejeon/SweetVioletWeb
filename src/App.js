// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SignInHeader from './components/SignInHeader';
import Preferences from './pages/Preferences';
import MealPlan from './pages/MealPlan';
import MealPlanDetail from './pages/MealPlanDetail';
import SignIn from './pages/SignIn';
import { AppProvider } from './AppContext';

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
            { label: 'Preferences', href: '/preferences' },
            { label: 'Meal Plan', href: '/meal-plan' },
          ]}
        />
      )}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/meal-plan/:day" element={<MealPlanDetail />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent /> {/* Place AppContent inside the Router */}
      </Router>
    </AppProvider>
  );
};

export default App;
