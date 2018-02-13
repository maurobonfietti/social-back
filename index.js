'use strict';

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/social')
        .then(() => {
            console.log('DB: Connect OK!');
        })
        .catch(err => console.log(err));
