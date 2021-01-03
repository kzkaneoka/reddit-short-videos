const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../models');
const Video = db.videos;

// Retrieve all Videos from the database.
exports.findAll = asyncHandler(async (req, res) => {
  const videos = await Video.findAll();
  res.status(200).json({ success: true, length: videos.length, data: videos });
});

// Find a single Video with an id
exports.findOne = asyncHandler(async (req, res, next) => {
  const video = await Video.findByPk(req.params.id);
  if (!video) {
    return next(
      new ErrorResponse(`Video not found with id = ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: video });
});

// Create and Save a new Video
exports.create = asyncHandler(async (req, res, next) => {
  // Validate request
  if (
    !req.body.title ||
    !req.body.video_url ||
    !req.body.post_url ||
    !req.body.subreddit_id
  ) {
    return next(new ErrorResponse('Some video information is missing', 400));
  }

  let video = await Video.findOne({ where: { video_url: req.body.video_url } });

  if (video) {
    return next(new ErrorResponse('Duplicate video', 409));
  }

  // Create a Video
  video = {
    title: req.body.title,
    video_url: req.body.video_url,
    post_url: req.body.post_url,
    subreddit_id: req.body.subreddit_id,
  };

  // Save Video in the database
  const data = await Video.create(video);
  res.status(200).json({ success: true, data: video });
});

// Update a Video by the id in the request
exports.update = asyncHandler(async (req, res, next) => {
  if (
    !req.body.title &&
    !req.body.video_url &&
    !req.body.post_url &&
    !req.body.subreddit_id
  ) {
    return next(new ErrorResponse('Some video information is required', 400));
  }

  let data = await Video.findByPk(req.params.id);
  if (!data) {
    return next(new ErrorResponse('Video does not exist', 404));
  }

  const body = req.body;
  await Video.update(body, {
    where: { id: req.params.id },
  });
  video = await Video.findByPk(req.params.id);
  res.status(200).json({ success: true, data: video });
});

// Delete a Video with the specified id in the request
exports.delete = asyncHandler(async (req, res, next) => {
  let video = await Video.findByPk(req.params.id);
  if (!video) {
    return next(new ErrorResponse('Video does not exist', 404));
  }
  Video.destroy({ where: { id: req.params.id } });
  res.status(200).json({ success: true, data: {} });
});
