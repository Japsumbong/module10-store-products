const mongoose = require('mongoose');
require('dotenv').config();

// Choose DB from environment variable or fallback
const dbURI = process.env.DB_URI || 'mongodb://localhost/testdb';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
