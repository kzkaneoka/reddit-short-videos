const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Subreddit = sequelize.define(
    'subreddits',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subreddit_url: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      modified_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    { timestamps: false }
  );
  return Subreddit;
};
