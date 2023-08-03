const mongoose = require('mongoose');
const cardSchema = require('../models/schema');

const uri = 'mongodb+srv://nicoleloaiza31:Jl742G1vXoaexKsc@cluster0.fd3quse.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err);
  });

const db = mongoose.connection.useDb('yugiohDB');
const cardModel = db.model('card', cardSchema, 'yugiohData');

module.exports = cardModel;
