import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph2.css';

const Graph2: React.FC = () => {
  const navigate = useNavigate();

  const GraphGenerated = () => {
    navigate('/graph-generated');
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="graph2">
      <button onClick={goBack} className="back-button">Back</button>
      <h1>Sustainable Energy Consumption</h1>
      <div className="input-container">
        <label htmlFor="country1">Select Country 1:</label>
        <select id="country1" name="country1">
          <option value="country1">Country 1</option>
          <option value="country2">Country 2</option>
          <option value="country3">Country 3</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="country2">Select Country 2:</label>
        <select id="country2" name="country2">
          <option value="country1">Country 1</option>
          <option value="country2">Country 2</option>
          <option value="country3">Country 3</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="country3">Select Country 3:</label>
        <select id="country3" name="country3">
          <option value="country1">Country 1</option>
          <option value="country2">Country 2</option>
          <option value="country3">Country 3</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="country4">Select Country 4:</label>
        <select id="country4" name="country4">
          <option value="country1">Country 1</option>
          <option value="country2">Country 2</option>
          <option value="country3">Country 3</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="year">Select Year:</label>
        <select id="year" name="year">
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <button className="generate-button" onClick={GraphGenerated}>Generate Graph</button>
    </div>
  );
};

export default Graph2;
