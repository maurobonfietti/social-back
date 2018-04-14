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

function getPublications(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 4;
    Follow.find({user: req.user.sub}).populate('followed').exec((err, follows) => {
        if (err) return res.status(500).send({message: "Get publications error."});

        var follows_clean = [];

        follows.forEach((follow) => {
            follows_clean.push(follow.followed);
        });

        Publication.find({user: {"$in": follows_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total) => {
            if (err) return res.status(500).send({message: "Get publications error..."});
            if (!publications) return res.status(404).send({message: "Publications not found."});

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total/itemsPerPage),
                page: page,
                publications
            });
        });
    });
}

module.exports = {
    test,
    savePublication,
    getPublications
};
