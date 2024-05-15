import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph4.css';

const Graph4: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['', '']);
  const [error, setError] = useState<string>('');
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:8080/countries');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const generateGraph = async () => {
    try {
      if (selectedCountries.every(country => country === '')) {
        setError('Please select at least one country.');
        return;
      }

      const response = await fetch('http://localhost:8080/generate-graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          graphType: 'line',
          countries: selectedCountries.filter(country => country !== '')
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
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedCountry = event.target.value;
    setSelectedCountries(prevSelectedCountries => {
      const updatedSelectedCountries = [...prevSelectedCountries];
      updatedSelectedCountries[index] = selectedCountry;
      return updatedSelectedCountries;
    });
    setError('');
  };

  return (
    <div className="graph4">
      <button onClick={goBack} className="back-button">Back</button>
      <h1>Renewable Electricity</h1>
      {selectedCountries.map((_, index) => (
        <div key={index} className="input-container">
          <label htmlFor={`country${index + 1}`}>Select Country {index + 1}:</label>
          <select id={`country${index + 1}`} name={`country${index + 1}`} value={selectedCountries[index]} onChange={(e) => handleCountryChange(e, index)}>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      ))}
      {error && <p className="error-message">{error}</p>}
      <button className="generate-button" onClick={generateGraph}>Generate Graph</button>
    </div>
  );
};

export default Graph4;
