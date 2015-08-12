var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var pageParameters = {
    title: 'give.pizza - Make',
    isMakePage: true,
    url: process.env.isProd ? 'http://give.pizza' : 'localhost'
  };

  res.render('make', pageParameters);
});

module.exports = router;
