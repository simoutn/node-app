var express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const http = require ('http');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tododb";
 
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});
var User = mongoose.model('User', UserSchema);
 module.exports = User;



router.get('/message',  (req, res , next )=> {
    res.status(200).json ({
        message : 'get'
});
});

router.post('/register', async(req,res) => {
  
//   if (req.body.email &&
//     req.body.username &&
//     req.body.password &&
//     req.body.name) {
  
//     var userData = {
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//       name: req.body.name,
//     }
  
//     //use schema.create to insert data into the db
//     User.create(userData, function (err, user) {
//       if (err) {
//         return next(err)
//       } else {
//         return res.redirect('/profile');
//       }
//     });
//   }
 if (req.name)
res.send({message : "ceci est un test"})
 });

//   MongoClient.connect(url, function(req, db) {
//   var dbo = db.db("tododb");
//   var myobj = { name: "Company Inc", email: "haithem.turki@gmail.com",password :"123456",pseudo:"HAITHEMT" };
//   // var myobj = req.body;
//     dbo.collection("users").insertOne(myobj, function(req, res) {
//       if (req) throw req;
//       console.log("User saved");
//       db.close();
//     });
//   });

// });



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
