var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var pageParameters = {
    title: 'give.pizza - Make',
    isMake: true,
    url: Boolean(process.env.IS_PROD) ? 'http://give.pizza' : 'localhost:5000'
  };

  res.render('basic', pageParameters);
});

module.exports = router;
