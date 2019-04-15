'use strict';

var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/user');
var Follow = require('../models/follow');
var Message = require('../models/message');

function saveMessage(req, res) {
    var params = req.body;
    if (!params.text || !params.receiver) {
        return res.status(200).send({message: 'Please, send the message text and receiver...'});
    }
    var message = new Message();
    message.emitter = req.user.sub;
    message.receiver = params.receiver;
    message.text = params.text;
    message.created_at = moment().unix();
    message.viewed = 'false';
    message.save((err, messageStored) => {
        if (err)
            return res.status(500).send({message: 'Sending message error...'});
        if (!messageStored)
            return res.status(500).send({message: 'Error saving sended message...'});

        return res.status(200).send({message: messageStored});
    });
}

function getReceivedMessages(req, res) {
    var userId = req.user.sub;
    var itemsPerPage = 10;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Message.find({receiver: userId}).populate('emitter', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err)
            return res.status(500).send({message: 'Get messages error...'});
        if (!messages)
            return res.status(404).send({message: 'No messages...'});

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        });
    });
}

function getEmmitMessages(req, res) {
    var userId = req.user.sub;
    var itemsPerPage = 10;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Message.find({emitter: userId}).populate('emitter receiver', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err)
            return res.status(500).send({message: 'Get messages error...'});
        if (!messages)
            return res.status(404).send({message: 'No messages...'});

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        });
    });
}

function getConversation(req, res) {
    var userId = req.user.sub;
    var userId2 = req.params.user;
    var itemsPerPage = 30;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Message.find({emitter: { $in: [ userId, userId2 ] }, receiver: { $in: [ userId, userId2 ] }}).populate('emitter receiver', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err)
            return res.status(500).send({message: 'Get messages error...'});
        if (!messages)
            return res.status(404).send({message: 'No messages...'});

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        });
    });
}

function getConversation2(req, res) {
    var userId = req.user.sub;
    var itemsPerPage = 30;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Message.find({ $or: [{ emitter: userId }, { receiver: userId }]}).populate('emitter receiver', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err)
            return res.status(500).send({message: 'Get messages error...'});
        if (!messages)
            return res.status(404).send({message: 'No messages...'});

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        });
    });
}

function getUnviewedMessages(req, res) {
    var userId = req.user.sub;
    Message.count({receiver: userId, viewed: false}).exec((err, count) => {
        if (err)
            return res.status(500).send({message: 'Get messages error...'});

        return res.status(200).send({
            'unviewed': count
        });
    });
}

function setViewedMessages(req, res) {
    var userId = req.user.sub;
    Message.update({receiver: userId, viewed: 'false'}, {viewed: 'true'}, {"multi": true}, (err, messagesUpdated) => {
        if (err)
            return res.status(500).send({message: 'Set messages error...'});

        return res.status(200).send({
            messages: messagesUpdated
        });
    });
}

module.exports = {
    saveMessage,
    getReceivedMessages,
    getEmmitMessages,
    getUnviewedMessages,
    setViewedMessages,
    getConversation,
    getConversation2
};
