var express = require('express'),
    Stack = require('../models/clients.server.model');

/***
 * Index
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  if (req.user) {
    res.render('pages/stacks/index', {page_title: 'Stacks', user: req.user});

  } else {
    res.redirect('/users/login');
  }
};

/***
 * Create a stack index page
 * @param req
 * @param res
 * @param next
 */
exports.stacks = function (req, res, next) {
  if (req.user) {
    res.render('pages/stacks/create', {page_title: 'Create a Stack', user: req.user});

  } else {
    res.redirect('/users/login');
  }
};

/***
 * Creates a new stack
 * @param req
 * @param res
 * @param next
 */
exports.createStack = function (req, res, next) {
  var stack = new Stack(req.body);

  stack.save(function (err) {
    if (err) {
      if (err) return res.status(400).send(err);
    } else {
      res.json(stack);
    }
  });
};