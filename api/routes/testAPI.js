var express = require('express');
var router = express.Router();
var mongoDB = require("./../db.js");
const { MongoClient } = require("mongodb");

const client = new MongoClient(mongoDB.uri);

async function getPhotos() {
  var allPhotos = [];

  try {
    await client.connect();
    // Get the database and collection on which to run the operation
    const db = client.db("photos");
    const col = db.collection("photo");

    // Get the database and collection on which to run the operation
    const cursor = col.find({});

    // Find the document
    allPhotos = await cursor.toArray();
    // Print results
  } catch (err) {
    console.log(err.stack);
  } finally {
  }

  return allPhotos;
}

router.get('/', async function (req, res, next) {
  const allPhotos = await getPhotos();
  res.send(allPhotos);
});

module.exports = router;