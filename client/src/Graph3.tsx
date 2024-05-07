import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph3.css';

const Graph3: React.FC = () => {
  const navigate = useNavigate();

  const GraphGenerated = () => {
    navigate('/graph-generated');
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="graph3">
      <button onClick={goBack} className="back-button">Back</button>
      <h1>Canada and Top 5 Countries</h1>
      <div className="input-container">
        <label htmlFor="parameter">Select Parameter:</label>
        <select id="parameter" name="parameter">
          <option value="greenhouse_gas_emissions">Greenhouse Gas Emissions</option>
          <option value="population">Population</option>
          <option value="gdp">GDP</option>
        </select>
      </div>
      <button className="generate-button" onClick={GraphGenerated}>Generate Graph</button>
    </div>
  );
};

export default Graph3;
