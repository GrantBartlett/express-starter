var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: String,
  password: String
});

Account.plugin(passportLocalMongoose);

/***
 * Update Password
 * @param username
 * @param data
 */
Account.statics.updatePassword = function (username, request, cb) {

  // Identifying... do you even exist bro?
  this.findOne({username: username}, function (err, user) {
    if (!err) {

      // Checking credentials
      if (request.password === request.password_confirm && request.password !== undefined) {
        // Set new password
        user.setPassword(request.password, function (err) {

          if (!err) {
            // And save
            user.save(function (err) {
              if (!err) {
                return cb('updated');
              } else {
                return cb('error');
              }
            });
          }
        });
      }

    } else {
      // No user on the record goes by this name, bye bye!
      return cb('not found');
    }
  });
};

module.exports = mongoose.model('Account', Account);