var express = require('express');
var mongoose = require('mongoose');
var Order = require('../pizzaDB')(mongoose).Orders;

var router = express.Router();

/* GET users listing. */
router.get('/pay/:id', function(req, res) {
    console.log("ID: %s", req.params.id);
    Order.findOne({orderId: req.params.id}, function (err, order) {
        if (err) {
            console.error("Error: %s", err);
        }
        if (order) { //If order exists
            res.render('pay', {
                friendName: order.name.indexOf(' ') == -1 ? order.name :  //Split name to just first name
                    order.name.substring(0, order.name.indexOf(' ')),
                friendMsg: order.message,
                pepperoniSelected: (order.pizzaId.options == "P=1" ? "pizzaSelected" : ""),  //Changes which pizza is selected on next screen
                sausageSelected: (order.pizzaId.options == "S=1" ? "pizzaSelected" : ""),
                cheeseSelected: (order.pizzaId.options == "" ? "pizzaSelected" : ""),
                size: order.pizzaId.size,
                orderTotal: "xx.xx"
            });
        }
        else {
          return res.send(400);
        }
    });
});

module.exports = router;
