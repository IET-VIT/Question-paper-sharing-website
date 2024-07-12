const mongoose = require('mongoose');
const file = require('../models/file');

require('dotenv').config();

function connectDB() {
    // Database connection 🥳
    mongoose.connect(process.env.DB_URL);
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    });
}

module.exports = connectDB;
