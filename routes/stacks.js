var express = require('express'),
  stacks = require('../controllers/stacks.server.controller'),
  app = express.Router();

/* GET users listing page. */
app.route('/')
  .get(stacks.index);

app.route('/create')
  .get(stacks.stacks)
  .post(stacks.createStack);

module.exports = app;