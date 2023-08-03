const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema ({
  name : String,
  description : String,
  type : String,
  attack_points : Number,
  defense_points : Number
})

module.exports = cardSchema;
