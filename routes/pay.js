var express = require('express');
var mongoose = require('mongoose');
var Order = require('../pizzaDB')(mongoose);

var router = express.Router();

/* GET users listing. */
router.get('/pay/:id', function(req, res) {
    console.log("ID: %s", req.params.id);
    Order.findOne({ orderId: req.params.id }, function(err, order) {
        if (err) {
            console.error("Error: %s", err);
        }
        console.log(order);
        if(order.length != 0) {
            console.log(order.name);
            res.render('pay', { friendName: order.name.substring(0, order.name.indexOf(' ')), friendMsg: order.message });
        }
    });
});

module.exports = router;
