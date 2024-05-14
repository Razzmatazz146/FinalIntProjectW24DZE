import React from 'react';
import './GraphGenerated.css';
import fakeGraph from '../../server/images/fake_graph.png'; // Import the image

const GraphGenerated: React.FC = () => {

    const goBack = () => {
        window.history.back();
    };

    const downloadImage = () => {
        const anchor = document.createElement('a');
        anchor.href = fakeGraph;
        anchor.download = 'fake_graph.png';
        anchor.click();
    };

    return (
        <div className="graph-generated">
            <button onClick={goBack} className="back-button">Back</button>
            <h1>Graph Generated</h1>
            <div className="graph-container">
                <img src={fakeGraph} alt="Fake Graph" className="graph-image-placeholder" />
            </div>
            <p className="data-source">Data source: Your Source Here</p>
            <button className="download-button" onClick={downloadImage}>Download Result</button>
        </div>
    );
};

export default GraphGenerated;
