import React from 'react';
import './GraphGenerated.css';

const GraphGenerated: React.FC = () => {

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="graph-generated">
            <button onClick={goBack} className="back-button">Back</button>
            <h1>Graph Generated</h1>
            <div className="graph-container">
                <div className="graph-image-placeholder"></div>
            </div>
            <p className="data-source">Data source: Your Source Here</p>
            <button className="download-button">Download Result</button>
        </div>
    );
};

export default GraphGenerated;
