const { MongoClient } = require("mongodb");

//const uri = 'mongodb+srv://nicoleloaiza31:Jl742G1vXoaexKsc@cluster0.fd3quse.mongodb.net/?retryWrites=true&w=majority';
const uri = 'mongodb+srv://nicoleloaiza31:9HUFZTPJOXGKwBof@cluster0.er2rlau.mongodb.net/?retryWrites=true&w=majority';

let dbCollection ;

function connectToDb(){
  MongoClient.connect(uri)
  .then((client) => {
    dbCollection = client.db('sample_mflix');
  })
  .catch(error => {
    console.error(error);
  })

}

function getDB() {
  return dbCollection
}

module.exports = {
  connectToDb,
  getDB
}
