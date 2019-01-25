'use strict';

var mongoose = require('mongoose');
var app = require('./app');
const port = process.env.PORT || 3800;

mongoose.connect('mongodb://nodejs_api:nodejs_api@ds253889.mlab.com:53889/nodejs_api', { useNewUrlParser: true })
        .then(() => {
            console.log('DB: Connect OK!');
            app.listen(port, () => {
                console.log('Server running on => http://localhost:' + port);
            });
        })
        .catch(err => console.log(err));

console.log('Starting...');

//app.listen(port, () => {
//    console.log('Server running on => http://localhost:' + port);
//});