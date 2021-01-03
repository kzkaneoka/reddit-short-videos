const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URI, { logging: false });

const checkDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'.yellow);
  } catch (error) {
    console.error('Unable to connect to the database:'.red, error);
  }
};

db = {};
db.videos = require('./Video')(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.checkDb = checkDb;

module.exports = db;
