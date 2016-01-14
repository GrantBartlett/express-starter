var express = require('express'),
  passport = require('passport'),
  Account = require('../models/users.server.model'),
  app = express.Router();

/***
 * Index
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  if (req.user) {
    res.render('pages/users/index', {page_title: 'Profile', user: req.user});

  } else {
    res.redirect('/users/login');
  }
};

/***
 * Register index
 * @param req
 * @param res
 */
exports.register = function (req, res) {
  res.render('pages/users/register', {page_title: 'Register'});
};

/***
 * Register a new User
 * @param req
 * @param res
 * @param next
 */
exports.registerUser = function (req, res, next) {
  Account.register(new Account({username: req.body.username}), req.body.password, function (err) {
    if (err) {
      return next(err);
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/users');
    });
  });
};

/***
 * Login index
 * @param req
 * @param res
 */
exports.login = function (req, res) {
  res.render('pages/users/login', {page_title: 'Login'});
};

/***
 * Login user
 * @param req
 * @param res
 */
exports.loginUser = function (req, res) {
  if (req.user) {
    res.redirect('/users');
  } else {
    res.sendStatus(401);
  }
};

/***
 * Logout user
 * @param req
 * @param res
 */
exports.logoutUser = function (req, res) {
  req.logout();
  res.redirect('/users');
};

/***
 * Password reset index
 * @param req
 * @param res
 * @param next
 */
exports.passwordReset = function (req, res, next) {
  res.render('pages/users/password', {page_title: 'Password', user: req.user});
};

/***
 * Password change
 * @param req
 * @param res
 * @param next
 */
exports.passwordChange = function (req, res, next) {
  // Password fields are not empty and undefined
  if (req.body.password === req.body.password_confirm && req.body.password !== undefined) {

    // Call update password in schema
    Account.updatePassword(req.user.username, req.body, function (cb) {
      if (cb === 'updated') {
        res.redirect('/users');
      }
      else {
        return cb;
      }
    });
  } else {
    res.sendStatus(400)
  }
};