// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Preferences from './pages/Preferences';
import MealPlan from './pages/MealPlan';
import AppContext, { AppProvider } from './AppContext';

const App = () => {

  return (
    <AppProvider>
      <Router>
        <Header
          title="Sweet Violet"
          navItems={[
            { label: 'Preferences', href: '/preferences' },
            { label: 'Meal Plan', href: '/meal-plan' }
          ]}
        />
        <Routes>
          <Route path="/" element={<Preferences />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/meal-plan" element={<MealPlan />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
