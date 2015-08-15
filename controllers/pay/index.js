var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  var pageParameters = {
    title: 'give.pizza - Pay',
    isMakePage: false,
    url: process.env.isProd ? 'http://give.pizza' : 'localhost:5000'
  };

  res.render('pay', pageParameters);
});

module.exports = router;
