const Sequelize = require('sequelize'); // Class
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
}); // object

// 모델 정의
const User = sequelize.define('User', {
  name: Sequelize.STRING,
});

module.exports = { Sequelize, sequelize, User };
