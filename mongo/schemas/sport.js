const mongoose = require('mongoose');
const ShemaNames = require('../shemaNames');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: { type: String }, 
    key: { type: String },
});

module.exports = {
    private: false,
    model: mongoose.model(ShemaNames.SPORT, schema),
  };
  