var express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/haythemdbb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("haythemdb");
    //Find all documents in the users collection:
    db.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
  


router.get('/message',  (req, res , next )=> {
    res.status(200).json ({
        message : 'get'
});
});

router.post('/',  (req, res , next )=> {
    res.status(200).json ({
        message : 'post'
});
});

module.exports=router;
