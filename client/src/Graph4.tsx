import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Graph4.css';

const Graph4: React.FC = () => {
    const navigate = useNavigate();

    const GraphGenerated = () => {
        navigate('/graph-generated');
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="graph4">
            <button onClick={goBack} className="back-button">Back</button>
            <h1>Renewable Electricity</h1>
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
            <button className="generate-button" onClick={GraphGenerated}>Generate Graph</button>
        </div>
    );
};

export default Graph4;
