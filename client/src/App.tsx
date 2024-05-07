import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './MainMenu';
import ExploreData from './ExploreData';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/explore-data" element={<ExploreData />} />
      </Routes>
    </Router>
  );
}

export default App;
