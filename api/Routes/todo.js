const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Connection Database
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/tododb', (err, client) => {
      if (err) return console.log(err);
      let db = client.db('tododb');
      closure(db);
  })
}
// Error handling
const sendError = (err, res, code) => {
  response.status = code;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(code).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};
// add todo
router.post('/add/:id', (req,res) => {
  connection(db=>{
    db.collection('users').findOneAndUpdate
  ({"_id":ObjectID(req.params.id)},{$push:{todo : req.body}})
  .then(result=>{
          response.data = result;
          response.message= "OK";
          res.json(response);
      }).catch(err => {
        sendError(err, res, 409);
      })
  });
});
router.post('/delete/:id', (req,res) => {
  connection(db=>{
    db.collection('users').findOneAndUpdate
  ({"_id":ObjectID(req.params.id)},{$pull:{todo : req.body}})
  .then(result=>{
          response.data = result;
          response.message= "OK";
          res.json(response);
      }).catch(err => {
        sendError(err, res, 409);
      })
  });
});
module.exports=router;