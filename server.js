const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const passport = require('passport');

// Load environmental variables
dotenv.config({ path: './config/config.env' });

// Import routes
const users = require('./routes/users');
const login = require('./routes/login');

// Create routes
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Mount Routers
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use('/api/v0/users', users);
app.use('/api/v0/login', login);
app.use(errorHandler);

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	// Close server and  exit process
	server.close(() => process.exit(1));
});
