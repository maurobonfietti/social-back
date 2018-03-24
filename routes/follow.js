'use strict';

var express = require('express');
var FollowController = require('../controllers/follow');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir: './uploads/users'});

api.post('/follow', md_auth.ensureAuth, FollowController.saveFollow);
api.delete('/follow/:id', md_auth.ensureAuth, FollowController.deleteFollow);

module.exports = api;
