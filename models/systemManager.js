const { Schema, model } = require('mongoose');


const systemManagerSchema = new Schema({
    id: {type: Number},
    name: {type: String, required: true},
    email: {type: String,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
        unique: true
    },
    password: {type: String},
}, {collections: 'system_managers'});

const systemManager = model('systemManager', systemManagerSchema); 
module.exports = systemManager;