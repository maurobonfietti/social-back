'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.connect('mongodb://localhost:27017/social', { useNewUrlParser: true })
        .then(() => {
            console.log('DB: Connect OK!');
            app.listen(port, () => {
                console.log('Server running on => http://localhost:' + port);
            });
        })
        .catch(err => console.log(err));

console.log('Starting...');
