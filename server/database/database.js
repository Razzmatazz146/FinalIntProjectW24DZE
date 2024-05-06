const mongoose = require('mongoose');

// Connection URL
const databaseName = 'web'
const url = `mongodb://127.0.0.1:27017/${databaseName}`; // edit this

async function connect() {
    // Use connect method to connect to the server
    await mongoose.connect(url);
    console.log('Connected successfully to MongoDB database');

    return 'done.';
}

// We export the connect method and the collection reference
module.exports = {
    connect
}