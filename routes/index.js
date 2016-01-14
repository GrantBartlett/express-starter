var express = require('express'),
  app = express.Router();

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', {user: req.user});
});

module.exports = app;