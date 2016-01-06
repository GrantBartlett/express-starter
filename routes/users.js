var express = require('express');
var passport = require('passport');
var users = require('../controllers/users.server.controller');
var app = express.Router();

/* GET users listing. */
app.route('/')
  .get(users.index);

/* GET reg page. */
app.route('/register')
  .get(users.register)
  .post(users.createNew);

/* GET login page. */
app.route('/login')
  .get(users.login)
  .post(passport.authenticate('local'), users.login);

module.exports = app;