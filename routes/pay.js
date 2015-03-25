var express = require('express');
var mongoose = require('mongoose');
var Order = require('../pizzaDB')(mongoose).Orders;

var router = express.Router();

/* GET users listing. */
router.get('/pay/:id', function(req, res) {
    //if(req.connection.isEncrypted()) {
        console.log("ID: %s", req.params.id);
        Order.findOne({orderId: req.params.id}, function (err, order) {
            if (err) {
                console.error("Error: %s", err);
            }
            if (order) {
                res.render('pay', {
                    friendName: order.name.indexOf(' ') == -1 ? order.name :
                        order.name.substring(0, order.name.indexOf(' ')), friendMsg: order.message,
                    pepperoniSelected: (order.pizzaId.options == "P=1" ? "pizzaSelected" : ""),
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
    //}
   // else {
     //   alert("Must be encrpted!");
    //}
});

module.exports = router;
