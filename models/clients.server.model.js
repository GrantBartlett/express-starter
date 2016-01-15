var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var Clients = new Schema({
  logo: String,
  name: String
});

Clients.plugin(passportLocalMongoose);

module.exports = mongoose.model('Client', Clients);