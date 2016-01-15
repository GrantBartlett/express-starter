var express = require('express'),
  passport = require('passport'),
  clients = require('../controllers/clients.server.controller'),
  app = express.Router();

/* GET users listing page. */
app.route('/')
  .get(clients.index);

app.route('/create')
  .get(clients.client)
  .post(clients.createClient);

module.exports = app;