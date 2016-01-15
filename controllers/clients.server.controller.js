var express = require('express'),
  passport = require('passport'),
  Client = require('../models/clients.server.model');

/***
 * Index
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  if (req.user) {
    res.render('pages/clients/index', {page_title: 'Clients', user: req.user});

  } else {
    res.redirect('/users/login');
  }
};

/***
 * Create a client index page
 * @param req
 * @param res
 * @param next
 */
exports.client = function (req, res, next) {
  if (req.user) {
    res.render('pages/clients/create', {page_title: 'Create a Client', user: req.user});

  } else {
    res.redirect('/users/login');
  }
};

/***
 * Creates a new client
 * @param req
 * @param res
 * @param next
 */
exports.createClient = function (req, res, next) {
  var client = new Client(req.body);

  client.save(function (err) {
    if (err) {
      if (err) return res.status(400).send(err);
    } else {
      res.json(client);
    }
  });
};