var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: String,
  password: String
});

Account.plugin(passportLocalMongoose);

Account.statics.updatePassword = function (username, data) {

  this.findOne({username: username}, function (err, user) {
    if (err) {
      throw err;
    } else {

      if (data.password === data.password_confirm) {

        console.log('passwords match');
        user.setPassword(data.password, function (error) {
          if (!error) {

            user.save(function (error) {
              if (error) {
                console.log(error)
              }
            });


          } else {
            return error;
          }
        });

      } else {
        return 'passwords do not match';
      }
    }
  });

  //return this.findOne({
  //  _id: user_id
  //}, function (error, doc) {
  //  console.log('err' + error);
  //  console.log('doc' + doc);
  //});

  /*
   Account.instance.setPassword(user, function (err) {
   if (err) {
   throw err;
   }
   else {




   }
   });
   */
};


module.exports = mongoose.model('Account', Account);