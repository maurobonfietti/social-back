'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3800;

mongoose.connect('mongodb://social:social1@ds149059.mlab.com:49059/social', { useNewUrlParser: true })
.then(() => {
    console.log('DB: Connect OK!');
    app.listen(port, () => {
        console.log('Server running on => http://localhost:' + port);
    });
})
.catch(err => console.log(err));

console.log('Starting...');
