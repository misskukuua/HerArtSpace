import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import LoginPage from './components/LoginPage'; 
import SignUpPage from './components/SignupPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes for Login and Sign Up pages */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
