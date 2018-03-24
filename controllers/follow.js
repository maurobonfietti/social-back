'use strict';

//var fs = require('fs');
//var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/user');
var Follow = require('../models/follow');

function saveFollow(req, res) {
    var params = req.body;
    var follow = new Follow();
    follow.user = req.user.sub;
    follow.followed = params.followed;

    follow.save((err, followStored) => {
        if (err) return res.status(500).send({message: "Saving follow error."});
        if (!followStored) return res.status(404).send({message: "User follow not saved."});

        return res.status(200).send({follow: followStored});
    });
}

function deleteFollow(req, res) {
    var userId = req.user.sub;
    var followId = req.params.id;

    Follow.find({'user': userId, 'followed': followId}).remove(err => {
        if (err) return res.status(500).send({message: "Deleting follow error."});

        return res.status(200).send({message: 'Follow deleted.'});
    });
}

module.exports = {
    saveFollow,
    deleteFollow
};
