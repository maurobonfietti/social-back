'use strict';

var User = require('../models/user');

function home (req, res) {
    res.status(200).send({
        message: 'Welcome!'
    });
};

function test (req, res) {
    console.log(req.body);
    res.status(200).send({
        message: 'Testing...'
    });
};

module.exports = {
    home,
    test
};
