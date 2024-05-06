const express = require('express');
const router = express.Router();

// Route for generating a graph
router.post('/generate-graph', (req, res) => {
    // Extract parameters from request body
    const { graphType, countries, extraParams } = req.body;

    // TODO: Use Python code to query the database and generate the graph

    // TODO: Send back the resulting graph as a file to the client

    // TODO: Manage and cleanup of the server’s file storage
});

// Route for getting graph types
router.get('/graph-types', (req, res) => {
    // TODO: Return a list of graph types with sample images
});

// Route for getting countries
router.get('/countries', (req, res) => {
    // TODO: Return a list of countries
});

// Route for getting other parameters
router.get('/parameters', (req, res) => {
    // TODO: Return a list of other parameters (ex: date range, energy type, etc.)
});

// Route for proof of concept
router.post('/test-graph', (req, res) => {
    // Extract parameters from request body
    const { graphType, countries, extraParams } = req.body;

    // Call Python script to generate graph
    const python = spawn('python', ['./path/to/your/script.py', graphType, countries, extraParams]);

    python.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ message: 'Error generating graph' });
        }

        // Assuming the Python script saves the graph as an image online and returns the URL
        const imageUrl = 'https://pbs.twimg.com/media/EXUgmSsXQAAlWg7.jpg';

        // Send the image URL in the response
        res.json({ imageUrl });
    });
});

module.exports = router;