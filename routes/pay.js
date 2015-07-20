var express = require('express');
var mongoose = require('mongoose');
var Order = require('../pizzaDB');

var router = express.Router();

/* GET users listing. */
router.get('/pay/:id', function(req, res) {
    console.log("ID: %s", req.params.id);
    Order.findOne({ orderId: req.params.id }, { order: 1, message: 1 }, function (err, order) {
        if (err) {
            console.error("Error: %s", err);
        }
        if (order) { //If order exists
            console.dir(order.order.Products[0]);
            var pepSelected = "";
            var sausageSelected = "";
            if(typeof order.order.Products[0].Options !== "undefined") {
              pepSelected = (order.order.Products[0].Options["P"] ? "pizzaSelected" : "");
              sausageSelected = (order.order.Products[0].Options["S"] ? "pizzaSelected" : "");
            }
            res.render('pay', {
                friendName: order.order.FirstName,
                friendMsg: order.message,
                pepperoniSelected: pepSelected,  //Changes which pizza is selected on next screen
                sausageSelected: sausageSelected,
                cheeseSelected: (order.order.Products[0].Options == {} ? "pizzaSelected" : ""),
                size: order.order.Products[0].Code.substr(0, 2),  //First two letters are the size
                orderTotal: order.order.Amounts.Customer.toFixed(2)
            });
        }
        else {
          return res.send(400);
        }
    });
});

module.exports = router;
