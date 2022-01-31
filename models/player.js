const mongoose = require('mongoose');
const { Schema, model } = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

const consts = require('../constants');
const { DB_HOST, DB_USER, DB_PASS } = consts;
const connectionString = DB_HOST;

const options = {
    useNewUrlParser: true, // For deprecation warnings
    useUnifiedTopology: true, // For deprecation warnings
    user: DB_USER,
    pass: DB_PASS
  };

const connection = mongoose.createConnection(connectionString , options);
autoIncrement.initialize(connection);


const playerSchema = new Schema({
    id: {type: Number, default: 0, unique: true},
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
        unique: true
    },
    password: {type: String},
    registeredAt: {type: Date, default: Date.now},
    lastLogin: {type: Date, default: Date.now},
    pointsEarned: {type: Number, default: 0},
    gamesWins: {type: Number, default: 0},
    gamesLosses: {type: Number, default: 0}
}, {collections: 'players'});

playerSchema.plugin(autoIncrement.plugin, {
    model: 'Player',
    field: 'id',
    startAt: 1,
    incrementBy: 1
  });


const Player = model('Player', playerSchema);
module.exports = Player;