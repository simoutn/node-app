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