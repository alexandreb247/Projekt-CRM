const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Action = new Schema(
    {
        date: {
            type: String, 
            required: true,
        },
        type: {
            type: String, 
            required: true,
        },
        description: {
            type: String, 
            required: true,
        },
        clientId: {
            type: String, 
            required: true,
        },
    }
);
module.exports = mongoose.model('Action', Action)