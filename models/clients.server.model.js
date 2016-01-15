var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Clients = new Schema({
  logo: String,
  name: String
});

module.exports = mongoose.model('Client', Clients);