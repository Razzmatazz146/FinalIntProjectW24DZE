import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph4.css';

const Graph4: React.FC = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [years, setYears] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    generateYears();
  }, []);

  const generateYears = () => {
    const yearList = Array.from({ length: 35 }, (_, i) => (1990 + i).toString());
    setYears(yearList);
  };

  const generateGraph = async () => {
    try {
      if (selectedYear === '') {
        setError('Please select a year.');
        return;
      }

      setIsLoading(true);

      const response = await fetch('http://localhost:8080/generate-graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          graphType: 'graph4',
          extraParams: selectedYear
        })
      });

      setIsLoading(false);

      if (response.status === 500) {
        setError('The selected year is not available for the graph.');
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
      setIsLoading(false);
      setError('An unexpected error occurred while generating the graph. Please try again.');
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    setError('');
  };

  return (
    <div className="graph4">
      <button onClick={goBack} className="back-button">Back</button>
      <h1>Renewable Electricity</h1>
      <div className="input-container">
        <label htmlFor="year">Select Year:</label>
        <select id="year" name="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {years.map(year => (
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

export default Graph4;
