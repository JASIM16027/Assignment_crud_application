const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config();

// const connectionPoolOptions = {
//   max: 300,
//   idle: 30000,
//   acquire: 60000,
// };
// const sequelize = new Sequelize(
//   `${process.env.database}`,
//   `${process.env.username}`,
//   `${process.env.password}`,
//   {
//     host: `${process.env.host}`,
//     dialect: 'mysql',
//     pool: connectionPoolOptions,
//     logging: false,
//   }
// );

const sequelize = new Sequelize('crud_api_db','root','123456',{
  dialect: 'mysql',
})

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const Profile = require('../models/profile.model')(sequelize, Model, DataTypes);
const Auth = require('../models/auth.model')(sequelize, Model, DataTypes);

Profile.hasOne(Auth);
Auth.belongsTo(Profile, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

db.Profile = Profile;
db.Auth = Auth;
module.exports = db;
