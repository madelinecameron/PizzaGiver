var express = require('express');
var router = express.Router();

module.exports = function(Order) {
  router.get('/:id', function(req, res, next) {
    Order.findOne({ id: req.params.id }, { order: 1, deliveryInfo: 1 }, function(err, order) {
      console.log(order.deliveryInfo)
      var pageParameters = {
        title: 'give.pizza - Pay',
        isMake: false,
        url: Boolean(process.env.IS_PROD) ? 'http://give.pizza' : 'localhost:5000',
        pizzaItems: order.order.Products,
        orderTotal: order.order.Amounts.Payment,
        friendName: order.order.FirstName,
        deliveryCost: (order.deliveryInfo.fee / 100),
        total: order.order.Amounts.Customer + (order.deliveryInfo.fee / 100)
      };
      res.render('basic', pageParameters);
    })
  });

  return router;
}
