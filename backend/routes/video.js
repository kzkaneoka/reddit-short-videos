module.exports = (app) => {
  const videos = require('../controllers/video');
  var router = require('express').Router();

  // Retrieve all Videos
  router.get('/', videos.findAll);

  // Retrieve a single Video with id
  router.get('/:id', videos.findOne);

  // Create and Save a new Video
  router.post('/', videos.create);

  // Update a Video by the id in the request
  router.put('/:id', videos.update);

  // Delete a Video with the specified id in the request
  router.delete('/:id', videos.delete);

  app.use('/api/v1/videos', router);
};
