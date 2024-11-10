// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Preferences from './pages/Preferences';
import MealPlan from './pages/MealPlan';
import MealPlanDetail from './pages/MealPlanDetail'; // Import the new MealPlanDetail page
import MealPlanV2 from './pages/MealPlanV2'; // Import the new MealPlanV2 component
import { AppProvider } from './AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Header
          title="Sweet Violet"
          navItems={[
            { label: 'Preferences', href: '/preferences' },
            //{ label: 'Meal Plan', href: '/meal-plan' },
            { label: 'Meal Plan V2', href: '/meal-plan-v2' }, // Add link for MealPlanV2
          ]}
        />
        <Routes>
          <Route path="/" element={<Preferences />} /> {/* Set MealPlanV2 as the homepage */}
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/meal-plan/:day" element={<MealPlanDetail />} />
          <Route path="/meal-plan-v2" element={<MealPlanV2 />} /> {/* Add route for MealPlanV2 */}
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
