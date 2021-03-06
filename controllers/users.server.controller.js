var express = require('express'),
  passport = require('passport'),
  User = require('../models/users.server.model');

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
  User.register(new User({username: req.body.username, roles: 'administrator'}),
    req.body.password, function (err) {
      if (err) {
        // TODO: Describe why, i.e user already exists
        res.sendStatus(403);
      } else {
        passport.authenticate('local')(req, res, function () {
          res.sendStatus(200);
        });
      }
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
    res.sendStatus(200);
  }
  else {
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
 */
exports.password = function (req, res) {

};

/***
 * Password reset email
 * @param req
 * @param res
 */
exports.passwordReset = function (req, res) {

};

/***
 * Password change index
 * @param req
 * @param res
 * @param next
 */
exports.passwordChange = function (req, res, next) {
  res.render('pages/users/password', {page_title: 'Password', user: req.user});
};

/***
 * Password change
 * @param req
 * @param res
 * @param next
 */
exports.passwordUpdate = function (req, res, next) {
  if (req.user) {
    // CHECK Password fields are NOT empty and NOT undefined
    if (req.body.password === req.body.password_confirm && req.body.password !== undefined) {

      // Go ahead and update the password
      // TODO: Check username cannot be hijacked in request
      User.updatePassword(req.user.username, req.body, function (cb) {
        if (cb === 'updated') {
          res.redirect('/users');
        }
        else {
          return cb;
        }
      });
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(401);
  }
};