const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const schema = new Schema({
    name: { type: String }, 
    creator: { type: Schema.Types.ObjectId, ref: "Users" }
});

module.exports = {
    private: false,
    model: mongoose.model('Annonces', schema),
  };
  