const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const playerSchema = new Schema({
    name: {type: String},
    username: {type: String},
    email: {type: String,
        required: true,
        match: /\S+@\S+\.\S+/,  //accepts any char that is not a space
        unique: true
    },
    password: {type: String},
    image: {data: Buffer, contentType: String}
}), {collections: 'players'};

const Player = model('Player', playerSchema); 
module.exports = Player;