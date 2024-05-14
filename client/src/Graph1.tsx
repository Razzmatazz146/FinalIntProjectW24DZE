import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph1.css';

const Graph1: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [error, setError] = useState<string>('');

  const generateGraph = async () => {
    try {
      if (!selectedCountry) {
        setError('Please select a country.');
        return;
      }

      const response = await fetch('http://localhost:8080/generate-graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          graphType: 'line',
          countries: [selectedCountry],
          extraParams: {}
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate graph');
      }

      const blob = await response.blob();

      localStorage.setItem('graphImage', URL.createObjectURL(blob));

      navigate('/graph-generated');
    } catch (error) {
      console.error('Error generating graph:', error);
      // Handle error
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
    setError('');
  };

  return (
    <div className="graph1">
      <button onClick={goBack} className="back-button">Back</button>
      <h1>Fossil Energy Consumption</h1>
      <div className="input-container">
        <label htmlFor="country">Select a Country:</label>
        <select id="country" name="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          <option value="Country 1">Country 1</option>
          <option value="Country 2">Country 2</option>
          <option value="Country 3">Country 3</option>
        </select>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </div>
      <button className="generate-button" onClick={generateGraph}>
        Generate Graph
      </button>
    </div>
  );
};

export default Graph1;
