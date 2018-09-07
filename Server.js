const http = require ('http');
const app = require ('./app');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Enable bodyParser (middleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
const server = http.createServer (app);
server.listen(port);