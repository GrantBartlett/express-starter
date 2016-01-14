var express = require('express'),
  passport = require('passport'),
  users = require('../controllers/users.server.controller'),
  app = express.Router();

/* GET users listing page. */
app.route('/')
  .get(users.index);

/* GET/POST register page. */
app.route('/register')
  .get(users.register)
  .post(users.registerUser);

/* GET/POST login page. */
app.route('/login')
  .get(users.login)
  .post(passport.authenticate('local'), users.loginUser);

/* GET/POST password reset page. */
app.route('/password-reset')
  .get(users.password)
  .post(users.passwordReset);

/* GET/POST password change page. */
app.route('/profile')
  .get(users.passwordChange)
  .post(users.passwordUpdate);

/* GET logout page. */
app.route('/logout')
  .get(users.logoutUser);

module.exports = app;