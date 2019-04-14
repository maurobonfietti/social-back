'use strict';

var moment = require('moment');
const version = '0.2.0';

function help(req, res) {
    res.status(200).send({
        message: 'Welcome Back! API Version: ' + version + ' ;-)'
    });
}

function status(req, res) {
    res.status(200).send({
        message: {
            'api': 'social',
            'status': 'OK',
            'version': version,
            'time': moment().unix()
        }
    });
}

module.exports = {
    help,
    status
};
