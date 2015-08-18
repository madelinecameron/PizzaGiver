var express = require('express');
var router = express.Router();

module.exports = function(db, Order) {
  router.get('/:id', function(req, res, next) {
    Order.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(order) {
      order.get({
        plain: true
      });

      var selectedOrder = order.dataValues.Order;

      var pageParameters = {
        title: 'give.pizza - Pay',
        isMake: false,
        url: Boolean(process.env.IS_PROD) ? 'http://give.pizza' : 'localhost:5000',
        pizzaItems: selectedOrder.Products,
        orderTotal: selectedOrder.Amounts.Payment,
        friendName: selectedOrder.FirstName
      };

      res.render('basic', pageParameters);
    });
  });

  return router;
}
