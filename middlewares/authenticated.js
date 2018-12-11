'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Secret_Key1-2-3.';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'Forbidden: Invalid Token.'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if (payload.expired <= moment().unix()) {
            return res.status(401).send({message: 'Expired Token.'});
        }
    } catch (ex) {
        return res.status(403).send({message: 'Forbidden: Invalid Token...'});
    }
    req.user = payload;

    next();
};
