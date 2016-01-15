var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var Client = new Schema({
  logo: String,
  name: String
});

Client.plugin(passportLocalMongoose);

module.exports = mongoose.model('Client', Client);