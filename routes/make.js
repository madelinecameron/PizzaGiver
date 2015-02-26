/**
 * Created by Maddie on 2/24/2015.
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/make', function(req, res, next) {
    console.log("Rendering make!")
    res.render('make', { title: 'Express' });
});

module.exports = router;
