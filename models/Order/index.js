var Sequelize = require('sequelize');

module.exports = function(db) {
  return db.define('Order', {
    id: {
      type: Sequelize.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    Order: Sequelize.JSON
  });
}
