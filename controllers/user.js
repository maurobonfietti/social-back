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
        User.find({ $or: [
            {email: user.email.toLowerCase()},
            {nick: user.nick.toLowerCase()}
        ]}).exec((err, users) => {
            if (err) return res.status(500).send({message: "Creating user error."}); 
            if (users && users.length >= 1) {
                return res.status(200).send({message: "User already exists."});
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    if (err) return res.status(500).send({message: "Saving user error."});
                    user.password = hash;
                });
                user.save((err, userStored) => {
                    if (err) return res.status(500).send({message: "Saving user error."});
                    if (userStored) {
                        return res.status(200).send({user: userStored});
                    } else {
                        return res.status(404).send({message: "User Not Found."});
                    }
                });
            }
        });
    } else {
        return res.status(200).send({message: 'Invalid Data.'});
    }
};

function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email: email}, (err, user) => {
        if (err) return res.status(500).send({message: "Login error."});
        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    user.password = undefined;
                    return res.status(200).send({user});
                } else {
                    return res.status(500).send({message: "Wrong email or password."});
                }
            });
        } else {
            return res.status(500).send({message: "Wrong email or password."});
        }
    });
}

module.exports = {
    home,
    test,
    saveUser,
    loginUser
};
