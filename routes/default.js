'use strict';

var express = require('express');
var api = express.Router();
var DefaultController = require('../controllers/default');

api.get('/', DefaultController.help);
api.get('/status', DefaultController.status);

module.exports = api;
