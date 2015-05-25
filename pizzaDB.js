var mongoose = require('mongoose');
var shortid = require('shortid');

var orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, default: shortid.generate },
    order: { type: mongoose.Schema.Types.Mixed, required: true},
    message: { type: String, required: false, default: "Thank you! :)" }
});

var emailSchema = new mongoose.Schema({
    email: { type: String, required: true }
});

module.exports = function(mongoose) {
    return {
        Orders: mongoose.model('Orders', orderSchema),
        Emails: mongoose.model('Emails', emailSchema)
    }
} 