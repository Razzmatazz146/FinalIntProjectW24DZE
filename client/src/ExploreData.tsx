import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreData.css';

const ExploreDataPage: React.FC = () => {
    const navigate = useNavigate();

    const graph1Select = () => {
        navigate('/graph1');
    };

    const graph2Select = () => {
        navigate('/graph2');
    };

    const graph3Select = () => {
        navigate('/graph3');
    };

    const graph4Select = () => {
        navigate('/graph4');
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className='background-image'>
            <button onClick={goBack} className="back-button">Back</button>
            <div className="explore-data-page">
                <div className="box">
                    <h2>Fossil Energy Consumption</h2>
                    <div className="graph1-picture-placeholder"></div>
                    <button onClick={graph1Select}>Select</button>
                </div>
                <div className="box">
                    <h2>Sustainable Energy Consumption</h2>
                    <div className="graph2-picture-placeholder"></div>
                    <button onClick={graph2Select}>Select</button>
                </div>
                <div className="box">
                    <h2>Canada and Top 5 Countries</h2>
                    <div className="graph3-picture-placeholder"></div>
                    <button onClick={graph3Select}>Select</button>
                </div>
                <div className="box">
                    <h2>Renewable Electricity</h2>
                    <div className="graph4-picture-placeholder"></div>
                    <button onClick={graph4Select}>Select</button>
                </div>
            </div>
        </div>
    );
};

export default ExploreDataPage;
