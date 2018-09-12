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
// register
router.post('/register', (req,res) => {
    connection(db=>{
        db.collection('users').insert(req.body).then(result=>{
            response.data = result;
            response.message= "OK";
            res.json(response);
        }).catch(err => {
          sendError(err, res, 409);
        })
    });
});
// Login
router.post('/login', (req,res) => {
  connection(db=>{
      db.collection('users').findOne({email:req.body.email}).
      then(result=>{
        if(!result) sendError("User not found",res,401);
        if(result.password === req.body.password){
          let token = jwt.sign({id:result._id},'secret',);
          response.data= {token:token};
          response.message='ok';
          response.status = 200;
          res.json(response);
        }else{
          sendError('Login Invalide',res,401);
        }
      }).catch(err => {
        sendError(err, res, 409);
      })
  });
});
module.exports=router;
