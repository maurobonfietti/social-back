'use strict';

var express = require('express');
var PublicationController = require('../controllers/publication');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/publication', md_auth.ensureAuth, PublicationController.test);

module.exports = api;
