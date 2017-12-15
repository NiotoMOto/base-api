const mongoose = require('mongoose');

const ShemaNames = require('../shemaNames');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: { type: String }, 
    path: { type: String },
    mimetype: { type: String }
});

module.exports = {
    private: false,
    model: mongoose.model(ShemaNames.PHOTOS, schema),
  };
  