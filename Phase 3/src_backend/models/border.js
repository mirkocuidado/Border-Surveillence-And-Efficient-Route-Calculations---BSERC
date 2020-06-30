const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Border = new Schema({
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    name: {
        type: String
    },
    link: {
        type: String
    },
    country: {
        type: String
    },
    message: {
        type: String
    },
    timeToWait: {
        type: Number
    }
});

const borderDatabase = mongoose.connection.useDb('borders');

module.exports = borderDatabase.model('Border', Border, 'borders');