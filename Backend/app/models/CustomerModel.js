const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema(
{
    address: {
      street: { type: String, required: true},
      city: { type: String, required: true},
      zipcode: { type: String, required: true}
    },
    company: { type: String},
    name: { type: String, required: true },
    nip: { type: String}
  });

module.exports = mongoose.model('Customer', Customer)