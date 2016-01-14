var express = require('express');
var passport = require('passport');
var users = require('../controllers/users.server.controller');
var app = express.Router();

/* GET users listing page. */
app.route('/')
  .get(users.index);

/* GET/POST register page. */
app.route('/register')
  .get(users.register)
  .post(users.createNew);

/* GET/POST login page. */
app.route('/login')
  .get(users.login)
  .post(passport.authenticate('local'), users.login);

/* GET/POST account page */
app.route('/account')
  .get(users.changePassword)
  .post(users.changePassword);

/* GET logout page. */
app.route('/logout')
  .get(users.logout);

module.exports = app;