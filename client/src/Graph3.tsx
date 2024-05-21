import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph3.css';

const Graph3: React.FC = () => {
  const navigate = useNavigate();
  const [selectedParameter, setSelectedParameter] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateGraph = async () => {
    try {
      if (!selectedParameter) {
        setError('Please select a parameter.');
        return;
      }

      setIsLoading(true);

      const response = await fetch('http://localhost:8080/generate-graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          graphType: 'graph3',
          extraParams: selectedParameter
        })
      });

      setIsLoading(false);

      if (!response.ok) {
        throw new Error('Failed to generate graph');
      }

      const blob = await response.blob();

      localStorage.setItem('graphImage', URL.createObjectURL(blob));

      navigate('/graph-generated');
    } catch (error) {
      console.error('Error generating graph:', error);
      setIsLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const handleParameterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedParameter(event.target.value);
    setError('');
  };

  return (
    <div className="graph3">
      <button onClick={goBack} className="back-button">Back</button>
      <h1>Canada and Top 5 Countries</h1>
      <div className="input-container">
        <label htmlFor="parameter">Select Parameter:</label>
        <select id="parameter" name="parameter" value={selectedParameter} onChange={handleParameterChange}>
          <option value="">Select Parameter</option>
          <option value="greenhouse_gas_emissions">Greenhouse Gas Emissions</option>
          <option value="population">Population</option>
          <option value="gdp">GDP</option>
        </select>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="generate-button" onClick={generateGraph} disabled={isLoading}>
        Generate Graph
      </button>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Graph3;
