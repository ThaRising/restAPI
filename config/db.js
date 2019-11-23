const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environmental variables
dotenv.config({ path: 'config.env' });

// Connect to Database
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
