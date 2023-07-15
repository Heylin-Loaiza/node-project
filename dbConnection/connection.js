const { MongoClient } = require("mongodb");

const uri = 'mongodb+srv://nicoleloaiza31:Jl742G1vXoaexKsc@cluster0.fd3quse.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('yugiohDB');
    const data = database.collection('yugiohData');

    //console.log(data);
    return data
  } catch (error) {
    console.error('An error occurred, try later', error);
  } finally {
    await client.close();
  }
}

module.exports = run;

