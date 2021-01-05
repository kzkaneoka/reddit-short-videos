const videos = require('../controllers/video');

// Init router and set to use the parent params
const router = require('express').Router({ mergeParams: true });

// Retrieve all Videos
// Retrieve all Videos with specified subreddit from the database
router.get('/', videos.findAll);

// Retrieve a single Video with id
router.get('/:id', videos.findOne);

// Create and Save a new Video
router.post('/', videos.create);

// Update a Video by the id in the request
router.put('/:id', videos.update);

// Delete a Video with the specified id in the request
router.delete('/:id', videos.delete);

module.exports = router;
