'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Publication = require('../models/publication');
var User = require('../models/user');
var Follow = require('../models/follow');

function test(req, res) {
    return res.status(200).send({message: "Publication Controller..."});
}

module.exports = {
    test
};
