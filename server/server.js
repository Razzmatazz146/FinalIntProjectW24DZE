const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database/database');
const { spawn } = require('child_process');
const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})


// Route for generating a graph
app.post('/graphs/generate', (req, res) => {
    // Extract parameters from request body
    const { graphType, countries, extraParams } = req.body;

    // TODO: Use Python code to query the database and generate the graph

    // TODO: Show image of graph before downloading

});

// Route for getting graph samples
app.get('/graphs', (req, res) => {
    // TODO: Return a list of graphs with sample images
});

// Route for downloading graphs
app.get('/graphs/download', (req, res) => {
    // TODO: Return image of graph for user to download

    // TODO: Manage and cleanup of the server’s file storage
});


// Route for proof of concept
app.post('/test-graph', (req, res) => {
    // Extract parameters from request body
    const { graphType, countries, extraParams } = req.body;
    console.log(req.body);

    // Convert countries and extraParams to strings
    const countriesStr = JSON.stringify(countries);
    const extraParamsStr = JSON.stringify(extraParams);

    // Call Python script to generate graph
    const python = spawn('python', ['./fake_graph.py', graphType, countriesStr, extraParamsStr]);

    python.on('stderr', function (data) {
        console.log('data: ', data);
    })

    python.on('stdout', function (data) {
        console.log('data: ', data);
    })


    python.on('error', (err) => {
        console.error(`Failed to start Python script: ${err.message}`);
        return res.status(500).json({ message: 'Error generating graph' });
    });

    python.on('close', (code) => {
        console.log('code: ', code);
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            return res.status(500).json({ message: 'Error generating graph' });
        }

        const imagePath = path.join('images','fake_graph.png');

        // Send the image file in the response
        res.sendFile(imagePath, { root: __dirname})
    });
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    connect()
    console.log("Server listening on port " + port)
})