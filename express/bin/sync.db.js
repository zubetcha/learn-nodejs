const models = require('../models');

module.exports = () => {
  // 데이터베이스 연동
  return models.sequelize.sync({ force: true });
};
