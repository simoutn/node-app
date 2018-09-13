const express =require('express');
const app = express();
var router = express.Router;
const bodyParser = require('body-parser');
const home = require('./api/Routes/home'); // Login & register
const todo =require('./api/Routes/todo'); // Todo
const bodyparser = require('body-parser');

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

app.use('/home',home);
app.use('/todo',todo);

//app.use(express.static(__dirname+"/dist"));

// app.use('*',(req,res)=>{
//   res.sendFile(__dirname+'/dist/index.html');
// });

module.exports=app;