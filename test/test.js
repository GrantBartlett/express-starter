var assert = require('assert');
var config = require('../config/config');
var mongoose = require('mongoose');
var request = require('supertest');
var should = require('should');

describe('Routes', function () {
  var url = 'http://localhost:3000';

  describe('Database', function () {
    it('should connect to mongodb', function (done) {
      // Connect to db
      mongoose.connect(config.db);
      done();
    });
  });

  describe('User', function (done) {

    // Register a new user account
    it('should register a user account', function (done) {

      var user = {
        username: 'tests_' + Date.now(),
        password: 'test'
      };

      request(url)
        .post('/users/register')
        .send(user)
        .expect(200, done);
    });

    // Should not register with existing nickname
    it('should return an error registering a username that already exists', function (done) {
      var user = {
        username: 'tests',
        password: 'test'
      };

      request(url)
        .post('/users/register')
        .send(user)
        .expect(403, done);
    });

    // Login
    it('should login to an existing user account', function (done) {
      var user = {
        username: 'tests',
        password: 'test'
      };

      request(url)
        .post('/users/login')
        .send(user)
        .expect(200, done);
    });

    // Login does not exist
    it('should return an error logging into a username that does not exist', function (done) {
      var user = {
        username: 'GrantDoesNotExist',
        password: 'test'
      };

      request(url)
        .post('/users/login')
        .send(user)
        .expect(401, done);
    });

    // Login with incorrect password
    it('should return an error logging into to an existing user with an incorrect password', function (done) {
      var user = {
        username: 'tests',
        password: 'wrong_pass'
      };

      request(url)
        .post('/users/login')
        .send(user)
        .expect(401, done);
    });
  });
});