'use strict';

//var fs = require('fs');
//var path = require('path');
//var mongoosePaginate = require('mongoose-pagination');
//var User = require('../models/user');
//var Follow = require('../models/follow');

function test(req, res) {
    res.status(200).send({
        message: 'Follow Test Endpoint...'
    });
}

module.exports = {
    test
};
