const http = require ('http');
const app = require ('./app');


const express = require('express');


const bodyParser = require('body-parser');



const port = process.env.PORT || 3000;
const server = http.createServer (app);
server.listen(port);