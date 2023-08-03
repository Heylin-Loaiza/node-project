const express = require('express');
const router = express.Router();
const cardModel = require('../dbConnection/connection');

// req = request = lo que viene
//res = response = lo que devuelvo
router.get('/', async (req, res) => {
  try {
    const data = await cardModel.find();
    res.json(data);
  }catch(err){
    console.error(err)
  }
});

// router.get('/id/:id', async (req, res) => {
//   const { id } = req.params;
//   const data = await cardModel.findOne({_id: id})

//   if (data) {
//     res.json(data);
//   } else {
//     res.status(404).json({ error: 'no encontrado' });
//   }
// });

//get
router.get('/:name', async (req, res) => {
  const { name } = req.params;
  const info = await cardModel.findOne({name: name})

  if (info) {
    res.json(info);
  } else {
    res.status(404).json({ error: 'no encontrado' });
  }
});

router.get('/type/:type', async (req, res) => {
  const { type } = req.params;
  const info = await cardModel.find({type: type})

  if (info) {
    res.json(info);
  } else {
    res.status(404).json({ error: 'no encontrado' });
  }
});

//post
router.post('/', async (req, res) => {
  try {
    const card = req.body;
    await cardModel.create(card)
    res.json(card);    
  }catch(err){
    console.error("Couldn't update item", err);
    res.status(500).json({ error: "Couldn't create card" });
  }
})

//put
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cardModel.updateOne({ _id: id }, { $set: req.body });
    res.json(data);
  }catch(err){
    console.error("Couldn't update item", err)
  }
})

//delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cardModel.deleteOne({_id: id});
    res.json(data);
  }catch(err){
    console.error("Couldn't delete item", err)
  }
});

module.exports = router;
