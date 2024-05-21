import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph2.css';

const Graph2: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['', '', '', '']);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1900; year <= currentYear; year++) {
      years.push(year.toString());
    }
    return years;
  };

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
      if (selectedCountries.every(country => country === '') || !selectedYear) {
        setError('Please select at least one country and one year.');
        return;
      }

      setIsLoading(true);

      const response = await fetch('http://localhost:8080/generate-graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          graphType: 'graph2',
          countries: selectedCountries.filter(country => country !== ''),
          extraParams: selectedYear
        })
      });

      setIsLoading(false);

      if (response.status === 500) {
        setError('Selected countries are not available for the selected year.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to generate graph');
      }

      const blob = await response.blob();

      localStorage.setItem('graphImage', URL.createObjectURL(blob));

      navigate('/graph-generated');
    } catch (error) {
      console.error('Error generating graph:', error);
      setError('An unexpected error occurred while generating the graph. Please try again.');
      setIsLoading(false);
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

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setError('');
  };

  return (
    <div className="graph2">
      <button onClick={goBack} className="back-button">Back</button>
      <h1>Sustainable Energy Consumption</h1>
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
      <div className="input-container">
        <label htmlFor="year">Select Year:</label>
        <select id="year" name="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {generateYearsArray().map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
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

export default Graph2;
