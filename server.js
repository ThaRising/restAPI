const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environmental variables
dotenv.config({ path: './config/config.env' });

// Import routers
const users = require('./routes/users');
const auth = require('./routes/auth');

// Create router
const app = express();

// Mount Routers
app.use('/api/v0/users', users);
app.use('/api/v0/auth', auth);

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port ${process.env.PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and  exit process
  server.close(() => process.exit(1));
});
