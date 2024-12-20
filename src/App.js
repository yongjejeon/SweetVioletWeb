// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SignInHeader from './components/SignInHeader';
import Preferences from './pages/Preferences';
import WelcomeScreen from './pages/WelcomScreen';
import MealPlanDetailV2 from './pages/MealPlanDetailV2'; // Import the new MealPlanDetailV2
import MealPlanV2 from './pages/MealPlanV2';
import QuestionEmotion from './pages/QuestionEmotion';
import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Question3 from './pages/Question3';
import Question4 from './pages/Question4';
import Question5 from './pages/Question5';
import Question6 from './pages/Question6';
import Question7 from './pages/Question7';
import Question8 from './pages/Question8';
import Question9 from './pages/Question9';
import SignIn from './pages/SignIn';
import { AppProvider } from './AppContext';
import HowToCook from './pages/HowToCook';
import SummaryPage from './pages/SummaryPage'; 
import PrintPage from './pages/PrintPage'; 

const AppContent = () => {
  const location = useLocation();

  // Define the paths where SignInHeader should be displayed
  const noNavLinksPaths = [
    '/', 
    '/welcomescreen', 
    '/QuestionEmotion', 
    '/Question0', 
    '/Question1', 
    '/Question2', 
    '/Question3', 
    '/Question4', 
    '/Question5', 
    '/Question6', 
    '/Question7', 
    '/Question8',
  ];

  // Determine which header to render based on the current path
  const renderHeader = noNavLinksPaths.includes(location.pathname);

  return (
    <>
      {renderHeader ? (
        <SignInHeader title="Mood Meals" />
      ) : (
        <Header
          title="Mood Meals"
          navItems={[
            { label: 'WelcomeScreen', href: '/welcomescreen' },
            { label: 'Meal Plan', href: '/meal-plan-v2' },
          ]}
        />
      )}
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/welcomescreen" element={<WelcomeScreen />} />
        <Route path="/QuestionEmotion" element={<QuestionEmotion />} />
        <Route path="/Question1" element={<Question1 />} />
        <Route path="/Question2" element={<Question2 />} />
        <Route path="/Question3" element={<Question3 />} />
        <Route path="/Question4" element={<Question4 />} />
        <Route path="/Question5" element={<Question5 />} />
        <Route path="/Question6" element={<Question6 />} />
        <Route path="/Question7" element={<Question7 />} />
        <Route path="/Question8" element={<Question8 />} />
        <Route path="/Question9" element={<Question9 />} />
        <Route path="/meal-plan-v2" element={<MealPlanV2 />} />
        <Route path="/meal-plan/:day" element={<MealPlanDetailV2 />} /> {/* Updated route */}
        <Route path="/how-to-cook" element={<HowToCook />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/print" element={<PrintPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div style={{ backgroundColor: '#F9F9F9', minHeight: '100vh' }}> {/* Set background color here */}
          <AppContent /> {/* Place AppContent inside the Router */}
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
