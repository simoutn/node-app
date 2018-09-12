var express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/haythemdbb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tododb");
    dbo.createCollection("users", function(err, res)
    {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
   
router.get('/message',  (req, res , next )=> {
    res.status(200).json ({
        message : 'get'
});
});

router.post('/register', async(req,res) => {
   var myobj = {
     name : req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  }
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
// router.post('/login', async(req,res) => {
//   res.status(200).json ({
//     message : 'Espace login'
// });
// });
router.post('/login', async(req,res) => {
  var result = db.user.findOne({ email: req.body.email });
  if (!result) {
      res.status(403).send({ message: 'user not found' });
  }
  if (result.password !== req.body.password) {
      res.status(402).send({ message: 'invalid password' });
  }
  result['password'] = '';
  delete result.password;
  const token = jwt.sign({data:result},'my_secret_key');
  res.send({user : result, message: 'you are sign in', userToken: token });

});

module.exports=router;
