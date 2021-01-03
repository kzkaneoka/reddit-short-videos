const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Video = sequelize.define(
    'videos',
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
      video_url: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl: true,
      },
      post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl: true,
      },
      // TODO: Set forign key after creating Subreddit model
      subreddit_id: {
        type: DataTypes.UUID,
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
  return Video;
};
