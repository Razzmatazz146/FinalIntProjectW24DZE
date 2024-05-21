const mongoose = require('mongoose');

// Connection URL
const databaseName = process.env.DB
const url = 'mongodb+srv://razzmatazz:z2Upc12FpaZMsxuo@energydata.l65g1qm.mongodb.net/PowerStatsDB' // edit this

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