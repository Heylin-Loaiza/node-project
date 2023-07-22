const express = require('express');
const router = express.Router();
const {connectToDb, getDB} = require('../routes/cards');

let db;

connectToDb((error) => {
  if(!error){
    db = getDB();
    console.log(db)
  }
})

router.get('/', (req, res) => {
  res.json(db);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = data.find(p => p.id === parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});