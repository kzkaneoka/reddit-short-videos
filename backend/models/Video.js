const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'videos',
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
      video_url: {
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true,
      },
      post_url: {
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true,
      },
      subreddit_id: {
        type: Sequelize.UUID,
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
