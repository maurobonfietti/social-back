'use strict';

var express = require('express');
var MessageController = require('../controllers/message');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/message-test', md_auth.ensureAuth, MessageController.testMessage);

module.exports = api;
