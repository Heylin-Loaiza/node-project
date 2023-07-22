const express = require('express');
const {connectToDb, getDB} = require('./dbConnection/connection');

const app = express();

app.listen(3000, () => {
  console.log('App listening on port 3000')
});

let db;

connectToDb((error) => {
  if(!error){
    db = getDB();
  }
})