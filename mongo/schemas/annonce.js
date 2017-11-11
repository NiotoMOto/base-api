const mongoose = require('mongoose');
const ShemaNames = require('../shemaNames');

const Schema = mongoose.Schema;


const schema = new Schema({
    name: { type: String }, 
    creator: { type: Schema.Types.ObjectId, ref: ShemaNames.USER }
});

module.exports = {
    private: false,
    model: mongoose.model(ShemaNames.ANNONCES, schema),
  };
  