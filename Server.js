const http = require ('http');
const app = require ('./app');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Enable bodyParser (middleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Enable CORS

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const port = process.env.PORT || 3000;
const server = http.createServer (app);
server.listen(port);