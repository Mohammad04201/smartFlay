import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainNavbar, Home, Flights, Airlines, CreateFlight, DataManager, SmartDataChat } from './index-exports';
import FlightDetails from './pages/FlightDetails';
import './App.css';
import './styles/jordanian-theme.css';

function App() {
  return (
    <Router>
      <div className="App">
        <MainNavbar />
        <div className="main-content" style={{ 
          minHeight: 'calc(100vh - 76px)'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/flight/:flightId" element={<FlightDetails />} />
            <Route path="/airlines" element={<Airlines />} />
            <Route path="/create-flight" element={<CreateFlight />} />
            <Route path="/data-manager" element={<DataManager />} />
            <Route path="/smart-chat" element={<SmartDataChat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
