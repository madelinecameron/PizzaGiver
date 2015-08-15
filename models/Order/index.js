var Sequelize = require('sequelize');

module.exports = function(db) {
  return db.define('Order', {
    id: Sequelize.UUID,
    order: Sequelize.JSON
  });
}
