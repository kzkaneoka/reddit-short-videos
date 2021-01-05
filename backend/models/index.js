const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URI, { logging: false });
const { DataTypes } = require('Sequelize');

// check if db connection is success or not
const checkDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'.yellow);
  } catch (error) {
    console.error('Unable to connect to the database:'.red, error);
  }
};

// init db
db = {};

// Add models
db.subreddits = require('./Subreddit')(sequelize, Sequelize);
db.videos = require('./Video')(sequelize, Sequelize);

// One-To-Many relationship between Subreddit and Video
db.subreddits.hasMany(db.videos, {
  foreignKey: 'subreddit_id',
  type: DataTypes.UUID,
  onDelete: 'CASCADE',
});
db.videos.belongsTo(db.subreddits, {
  foreignKey: 'subreddit_id',
  type: DataTypes.UUID,
  onDelete: 'CASCADE',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.checkDb = checkDb;

module.exports = db;
