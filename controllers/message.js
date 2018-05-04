'use strict';

var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');
var Message = require('../models/message');


function testMessage(req, res) {
    return res.status(200).send({message: 'Testing message controller endpoint...'});
}

module.exports = {
    testMessage
};
