'use strict';

var express = require('express');
var FollowController = require('../controllers/follow');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/follow-test', md_auth.ensureAuth, FollowController.test);

module.exports = api;
