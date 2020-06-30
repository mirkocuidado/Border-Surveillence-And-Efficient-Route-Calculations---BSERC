const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Request = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    type: {
        type: String,
        enum: ['administrator', 'user']
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    id: {
        type: String
    },
    birthDate: {
        type: Date
    },
    birthPlace: {
        type: String
    }
});

const userDatabase = mongoose.connection.useDb('users');

module.exports = userDatabase.model('Request', Request, 'requests');