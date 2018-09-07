const express =require('express');
const app = express();

const home = require('./api/Routes/home');
app.use('/home',home);
module.exports=app;