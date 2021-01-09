const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../models');
const Subreddit = db.Subreddit;

// Retrieve all Subreddits from the database.
exports.findAll = asyncHandler(async (req, res) => {
  const subreddits = await Subreddit.findAll();
  res
    .status(200)
    .json({ success: true, length: subreddits.length, data: subreddits });
});

// Find a single Subreddit with an id
exports.findOne = asyncHandler(async (req, res, next) => {
  const subreddit = await Subreddit.findByPk(req.params.id);
  if (!subreddit) {
    return next(
      new ErrorResponse(`Subreddit not found with id = ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: subreddit });
});

// Create and Save a new Subreddit
exports.create = asyncHandler(async (req, res, next) => {
  // Validate request
  if (!req.body.title || !req.body.subreddit_url) {
    return next(
      new ErrorResponse('Some subreddit information is missing', 400)
    );
  }

  let subreddit = await Subreddit.findOne({
    where: { subreddit_url: req.body.subreddit_url },
  });

  if (subreddit) {
    return next(new ErrorResponse('Duplicate subreddit', 409));
  }

  // Create a Subreddit
  subreddit = {
    title: req.body.title,
    subreddit_url: req.body.subreddit_url,
  };

  // Save Subreddit in the database
  const data = await Subreddit.create(subreddit);
  res.status(200).json({ success: true, data });
});

// Update a Video by the id in the request
exports.update = asyncHandler(async (req, res, next) => {
  if (!req.body.title && !req.body.subreddit_url) {
    return next(
      new ErrorResponse('Some subreddit information is required', 400)
    );
  }

  let data = await Subreddit.findByPk(req.params.id);
  if (!data) {
    return next(new ErrorResponse('Subreddit does not exist', 404));
  }

  const body = req.body;
  await Subreddit.update(body, {
    where: { id: req.params.id },
  });
  subreddit = await Subreddit.findByPk(req.params.id);
  res.status(200).json({ success: true, data: subreddit });
});

// Delete a Subreddit with the specified id in the request
exports.delete = asyncHandler(async (req, res, next) => {
  let subreddit = await Subreddit.findByPk(req.params.id);
  if (!subreddit) {
    return next(new ErrorResponse('Subreddit does not exist', 404));
  }
  Subreddit.destroy({ where: { id: req.params.id } });
  res.status(200).json({ success: true, data: {} });
});
