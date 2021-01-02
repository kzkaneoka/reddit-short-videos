const colors = require('colors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Init express
const app = express();

// Json parser
app.use(express.json());

// Logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set port
const PORT = process.env.PORT || 5000;

// Run server
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
