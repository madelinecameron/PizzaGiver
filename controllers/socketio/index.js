var pizzapi = require('pizzapi');
var handlebars = require('handlebars');
var fs = require('fs');
var mongoose = require('mongoose');
var shortid = require('shortid');
var postmates = new require('postmates')('cus_KZUs7iPkgHZfwV', '94a3b01b-4d7e-4593-974f-b1d7161b06df')

module.exports = function(server, Order) {
  var optionsTranslation = {
    'Pepperoni': 'P',
    'Sausage': 'S'
  };
  var io = require('socket.io').listen(server);

  io.on('connection', function (socket) {
    socket.on('find:store', function (data) {
      pizzapi.Util.findNearbyStores(data, 'Delivery', function(results) {
        fs.readFile(__dirname + '/../../views/partials/store.handlebars', function(err, file) {
          if(err) { console.log(err); }
          else {
            var template = handlebars.compile(String(file));
            var resultHtml = '';
            for(var x = 0; x < results.result.Stores.length; x++) {
              resultHtml += template(results.result.Stores[x]);
            }

            socket.emit('store:find', { stores: resultHtml });
          }
        });
      });
    });
    socket.on('find:item', function (data) {
      var store = new pizzapi.Store({ ID: data.storeID });
      // store.getFriendlyNames(function(results) {
      //   fs.readFile(__dirname + '/../../views/partials/item.handlebars', function(err, file) {
      //     if(err) { console.log(err); }
      //     else {
      //       var template = handlebars.compile(String(file));
      //       var resultHtml = '';
      //       for(var x = 0; x < results.result.length; x++) {
      //         resultHtml += template(results.result[x]);
      //       }
      //
             socket.emit('item:find', { items: "" });
      //     }
      //   });
      // });
    });
    socket.on('create:order', function (data) {

      var address = new pizzapi.Address(data);
      var customer = new pizzapi.Customer({
        address: address,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email
      });
      var order = new pizzapi.Order({ customer: customer, storeID: data.storeID, deliveryMethod: "Carryout" });

      for(var i = 0; i < data.order.length; i++) {
        var currentItem = data.order[i];

        var options = [];
        for(var x = 0; x < currentItem.options.length; x++) {
          options.push(optionsTranslation[currentItem.options[x]]);
        }

        order.addItem(new pizzapi.Item({
          code: currentItem.size + "SCREEN",
          quantity: 1,
          options: options
        }));
      }

      order.validate(function(results) {
        var newOrder = new pizzapi.Order(results.result);
        newOrder.price(function(results) {
          var orderInfo = results.result.Order;
          var selectedStore = new pizzapi.Store({ ID: results.result.Order.StoreID });
          selectedStore.getInfo(function(storeInfo) {
            storeInfo = storeInfo.result;

            var postmatesQuote = postmates.quote({
              pickup_address: storeInfo.StreetName + "," + storeInfo.City + "," + storeInfo.Region + "," + storeInfo.PostalCode,
              dropoff_address: orderInfo.Address.Street + "," + orderInfo.Address.City + "," + orderInfo.Address.Region + "," + orderInfo.Address.PostalCode
            }, function (err, result) {
              console.log(err, result.body)
              if(!err && result.body.kind !== "error") {
                Order.create({  //Create the order in the database
                    id: shortid.generate(),  // Internal Order ID != Dominos Order ID
                    order: orderInfo,
                    deliveryInfo: result.body
                  }, function(err, order) {
                    if(!err) {
                      socket.emit('order:create:success', {
                        baseURL: process.env.IS_PROD ? 'give.pizza' : 'localhost:5000',
                        orderID: order.id
                      });
                    }
                    else {
                      console.log(err)
                      socket.emit('order:create:fail', {
                        errorHTML: "<p>" + err.substring(0, 50) + "...</p>"
                      });
                    }
                });
              }
              else {
                socket.emit('order:create:fail', {
                  errorHTML: "<p>" + result.body.message + "</p>"
                });
              }
            })
          })
        })
      })
    });
  });
}
