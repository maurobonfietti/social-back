'use strict';

var express = require('express');

var UserController = require('../controllers/user');

var api = express.Router();

api.get('/home', UserController.home);

api.post('/test', UserController.test);

module.exports = api;
