const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  throw new Error('MONGODB_URI is not defined');
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoose;
