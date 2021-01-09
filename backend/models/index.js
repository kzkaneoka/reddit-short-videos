const Sequelize = require('sequelize');
const SubredditModel = require('./Subreddit');
const VideoModel = require('./Video');

// Connect to the database
const sequelize = new Sequelize(process.env.POSTGRES_URI, { logging: false });

// check if database connection is success or not
const checkDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'.yellow);
  } catch (error) {
    console.error('Unable to connect to the database:'.red, error);
  }
};

// Associate models with the connected database
const Subreddit = SubredditModel(sequelize);
const Video = VideoModel(sequelize);

// One-To-Many relationship between Subreddit and Video
Subreddit.hasMany(Video, {
  foreignKey: 'subreddit_id',
  type: Sequelize.UUID,
  onDelete: 'CASCADE',
});

Video.belongsTo(Subreddit, {
  foreignKey: 'subreddit_id',
  type: Sequelize.UUID,
  onDelete: 'CASCADE',
});

// init db
const db = { sequelize, checkDb, Subreddit, Video };

module.exports = db;
