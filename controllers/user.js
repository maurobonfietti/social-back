'use strict';

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

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

function saveUser (req, res) {
    var params = req.body;
    var user = new User();
    if (params.name && params.surname && params.nick && params.email && params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;
        bcrypt.hash(params.password, null, null, (err, hash) => {
            if (err) return res.status(500).send({message: "Saving user error."});
            user.password = hash;
        });
        user.save((err, userStored) => {
            if (err) return res.status(500).send({message: "Saving user error."});
            if (userStored) {
                res.status(200).send({user: userStored});
            } else {
                res.status(404).send({message: "User Not Found."});
            }
        });
    } else {
        res.status(200).send({
            message: 'Invalid Data.'
        });
    }
};

module.exports = {
    home,
    test,
    saveUser
};
