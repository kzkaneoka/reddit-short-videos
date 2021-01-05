const subreddits = require('../controllers/subreddit');

// Init router
const router = require('express').Router();

// Include other resource routers
const videoRouter = require('./video');

// Nested routers with video router
router.use('/:subreddit_id/videos', videoRouter);

// Retrieve all Subreddits
router.get('/', subreddits.findAll);

// Retrieve a single Subreddit with id
router.get('/:id', subreddits.findOne);

// Create and Save a new Subreddit
router.post('/', subreddits.create);

// Update a Subreddit by the id in the request
router.put('/:id', subreddits.update);

// Delete a Subreddit with the specified id in the request
router.delete('/:id', subreddits.delete);

module.exports = router;
