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

function savePublication(req, res) {
    var params = req.body;

    if (!params.text) return res.status(200).send({message: "Text field is required."});

    var publication = new Publication();
    publication.text = params.text;
    publication.file = 'null';
    publication.user = req.user.sub;
    publication.created_at = moment().unix();
    
    publication.save((err, publicationStored) => {
        if (err) return res.status(500).send({message: "Saving publication error."});
        if (!publicationStored) return res.status(404).send({message: "Publication not saved."});

        return res.status(200).send({publication: publicationStored});
    });
}

module.exports = {
    test,
    savePublication
};
