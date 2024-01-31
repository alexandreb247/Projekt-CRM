const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        address: {
            city: String,
            street: String,
            zip: String 
        },
        nip: String
    }
);
module.exports = mongoose.model('Customer', Customer)