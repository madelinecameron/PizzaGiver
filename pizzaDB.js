var shortid = require('shortid');
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, default: shortid.generate },
    order: { type: mongoose.Schema.Types.Mixed, required: true},
    message: { type: String, required: false, default: "Thank you! :)" }
});

module.exports = mongoose.model('Orders', orderSchema);
