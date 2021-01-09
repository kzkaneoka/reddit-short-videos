const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'subreddits',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subreddit_url: {
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      modified_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    { timestamps: false }
  );
};
