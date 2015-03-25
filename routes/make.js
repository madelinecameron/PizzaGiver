/**
 * Created by Maddie on 2/24/2015.
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/make', function(req, res, next) {
    res.render('make', { title: 'give.pizza' });
});

module.exports = router;
