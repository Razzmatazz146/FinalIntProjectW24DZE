import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph1.css';

const Graph1: React.FC = () => {
  const navigate = useNavigate();

  const GraphGenerated = () => {
    navigate('/graph-generated');
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="graph1">
      <button onClick={goBack} className="back-button">Back</button>
      <h1>Fossil Energy Consumption</h1>
      <div className="input-container">
        <label htmlFor="country">Select a Country:</label>
        <select id="country" name="country">
          <option value="country1">Country 1</option>
          <option value="country2">Country 2</option>
          <option value="country3">Country 3</option>
        </select>
      </div>
      <button className="generate-button" onClick={GraphGenerated}>Generate Graph</button>
    </div>
  );
};

export default Graph1;
