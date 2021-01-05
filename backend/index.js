const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Init express
const app = express();

// Connect database
const db = require('./models');
db.checkDb();
db.sequelize.sync();

// Json parser
app.use(express.json());

// Logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Load routers
const subreddits = require('./routes/subreddit');
const videos = require('./routes/video');

// Set routers
app.use('/api/subreddits', subreddits);
app.use('/api/videos', videos);

// Return error as json format
app.use(errorHandler);

// Set port
const PORT = process.env.PORT || 5000;

// Run server
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
