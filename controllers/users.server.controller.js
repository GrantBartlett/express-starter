var express = require('express');
var app = express.Router();
var Account = require('../models/users.server.model');

/* User index */
exports.index = function (req, res) {
  res.render('pages/users/index', {title: 'Users', user: req.user});
};

/* User registration landing */
exports.register = function (req, res) {
  res.render('pages/users/register', {title: 'Register'});
};

/* User login landing */
exports.login = function (req, res) {
  res.render('pages/users/login', {title: 'Login', user: req.user});
};

/* User reg post */
exports.createNew = function (req, res) {
  console.log('registering user');

  app.post('/register', function (req, res, next) {
    Account.register(new Account({username: req.body.username}), req.body.password, function (err) {
      if (err) {
        console.log('error while user register!', err);
        return next(err);
      }

      console.log('user registered!');

      res.redirect('/');
    });
  });
};