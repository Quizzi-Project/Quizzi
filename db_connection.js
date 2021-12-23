const mongoose = require('mongoose');
const consts = require('./constants');
const { DB_HOST, DB_USER, DB_PASS } = consts;
const connectionString = DB_HOST;

const options = {
    useNewUrlparser: true,
    useUnifiedTopology: true,
    user: DB_USER,
    pass: DB_PASS
};

mongoose
    .connect(connectionString, options)
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log(`Connection error: ${err}`));
