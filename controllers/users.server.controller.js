var express = require('express');
var passport = require('passport');
var Account = require('../models/users.server.model');
var app = express.Router();

/* User index */
exports.index = function (req, res) {
  if (req.user) {
    res.render('pages/users/index', {page_title: 'Profile', user: req.user});

  } else {
    res.redirect('/users/login');
  }
};

/* User registration landing */
exports.register = function (req, res) {
  res.render('pages/users/register', {page_title: 'Register'});
};

/* User login landing */
exports.login = function (req, res) {
  if (req.user) {
    res.redirect('/users');
  } else {
    res.render('pages/users/login', {page_title: 'Login', user: req.user});
  }
};

/* User logout landing */
exports.logout = function (req, res) {
  req.logout();
  res.redirect('/users');
};

/* User reg post */
exports.createNew = function (req, res, next) {
  Account.register(new Account({username: req.body.username}), req.body.password, function (err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    passport.authenticate('local')(req, res, function () {
      res.redirect('/users');
    });
  });
};

/* User change password */
exports.changePassword = function (req, res, next) {
  if (req.user) {
    res.render('pages/users/password', {page_title: 'Password', user: req.user});
    console.log('user authd');

    var account = new Account(req.user, req.password);

    if (req.body.password === req.body.password_confirm) {

      account.setPassword(req.body.password, function (error) {
        if (!error) {
          account.save(function (error) {
            if (error) {
              console.log(error)
            }
          });
        }
        else {
          console.log(error)
        }
      });
    } else {
      next();
    }
  }
  else {
    console.log('not logged in');
    res.redirect('/users');
  }
};