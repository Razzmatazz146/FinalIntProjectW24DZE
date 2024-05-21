const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database/database');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})


// Route for generating a graph
app.post('/generate-graph', async (req, res) => {
    // Extract parameter strings from request body
    // graphType : line, pie, bar
    // countries : array of country names
    // extraParams : array of extra parameters to pass to graphing library
    const { graphType, countries, extraParams } = req.body;

    // Convert countries and extraParams to strings
    const graphTypeStr = JSON.stringify(graphType)
    const countriesStr = JSON.stringify(countries);
    const extraParamsStr = JSON.stringify(extraParams);
    console.log("Graph: ", graphTypeStr);
    console.log("Countries: ", countriesStr);
    console.log("Extras: ", extraParamsStr);

    let scriptPath;
    switch (graphType) {
        case 'test':
            scriptPath = path.join('.', 'Scripts', 'fake_graph.py');
            break;
        case 'graph1':
            scriptPath = path.join('.', 'Scripts', 'generate_fossil_energy_graph.py');
            break;
        case 'graph2':
            scriptPath = path.join('.', 'Scripts', 'generate_sustainable_energy_pie_graph.py');
            break;
        case 'graph3':
            scriptPath = path.join('.', 'Scripts', 'generate_top5_bar_graph.py');
            break;
        case 'graph4':
            scriptPath = path.join('.', 'Scripts', 'generate_electricity_generation_stacked_graph.py');
            break;
        default:
            return res.status(400).json({ message: 'Invalid graphType' });
    }

    // Call Python script to generate graph
    let args = [scriptPath];
    if (graphType === 'graph1') {
        console.log(countries);
        args.push(countries);
    } else if (graphType === 'graph2') {
        console.log("JS: ", countries);
        args.push(extraParams, countriesStr);
    } else if (graphType === 'graph3') {
        console.log(extraParams);
        args.push(extraParams);
    } else if (graphType === 'graph4') {
        args.push(extraParams);
    }

    // Call Python script to generate graph
    const python = spawn('python', args);

    python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });


    python.on('error', (err) => {
        console.error(`Failed to start Python script: ${err.message}`);
        return res.status(500).json({ message: 'Error generating graph' });
    });

    const file_name = 'graph.png';

    const imagePath = path.join('images', file_name);

    python.on('close', (code) => {
        console.log('code: ', code);
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            return res.status(500).json({ message: 'Error generating graph' });
        }
        

        // Send the image file in the response
        res.sendFile(imagePath, { root: __dirname }, async (err) => {
            if (err) {
                console.error(`Failed to send image file: ${err.message}`);
                return res.status(500).json({ message: 'Error sending image' });
            } else {
                console.log('Image file sent');
                
                // Delete the image file after sending
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image file: ${err.message}`);
                    } else {
                        console.log('Image file deleted');
                    }
                });
            }
        });
    });
});

// Assuming you have a Mongoose model for your collection
const OwidEnergy = mongoose.model('OwidEnergy', new mongoose.Schema({}), 'OwidEnergy');

app.get('/countries', async (req, res) => {
    try {
        // Query the database for distinct country names
        const countries = await OwidEnergy.distinct('country');
        console.log('countries: ', countries);
        
        // Send the array of country names in the response
        res.json(countries);
    } catch (err) {
        console.error(`Failed to get countries: ${err.message}`);
        res.status(500).json({ message: 'Error getting countries' });
    }
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

        const imagePath = path.join('images', 'fake_graph.png');

        // Send the image file in the response
        res.sendFile(imagePath, { root: __dirname })
    });
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    connect()
    console.log("Server listening on port " + port)
})