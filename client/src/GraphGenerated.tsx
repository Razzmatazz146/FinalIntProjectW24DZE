import React from 'react';
import './GraphGenerated.css';

const GraphGenerated: React.FC = () => {
    const goBack = () => {
        window.history.back();
    };

    const downloadImage = () => {
        const graphImage = localStorage.getItem('graphImage');
        if (graphImage) {
            const anchor = document.createElement('a');
            anchor.href = graphImage;
            anchor.download = 'graph.png';
            anchor.click();
        }
    };

    const graphImage = localStorage.getItem('graphImage');

    return (
        <div className="graph-generated">
            <button onClick={goBack} className="back-button">Back</button>
            <h1>Graph Generated</h1>
            <div className="graph-container">
                {graphImage && (
                    <img src={graphImage} alt="Fake Graph" className="graph-image-placeholder" />
                )}
            </div>
            <p className="data-source">Data source: Your Source Here</p>
            <button className="download-button" onClick={downloadImage}>Download Result</button>
        </div>
    );
};

export default GraphGenerated;
