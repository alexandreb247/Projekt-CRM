const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema(
{
    address: {
      street: { type: String},
      city: { type: String},
      zipcode: { type: String}
    },
    company: { type: String},
    name: { type: String, required: true },
    nip: { type: String},
    createdAt: { type: Date},
    updatedAt: { type: Date}
  });

module.exports = mongoose.model('Customer', Customer)