'use strict';

function help(req, res) {
    res.status(200).send({
        message: 'Welcome Back! API Version 0.2.0 ;-)'
    });
}

module.exports = {
    help
};
