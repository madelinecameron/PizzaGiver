var mongoose = require('mongoose'),
    shortid = require('shortid'),
    orderSchema = new mongoose.Schema({
      id: { type: String, required: true, default: shortid.generate },
      order: { type: mongoose.Schema.Types.Mixed, required: true },
      deliveryInfo: { type: mongoose.Schema.Types.Mixed, required: true }
    });

module.exports = mongoose.model('Orders', orderSchema);
