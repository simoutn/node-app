const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const home = require('./api/Routes/home'); // Login & register
const todo =require('./api/Routes/todo'); // Todo

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


app.use('/',home);
//app.use('/todo',todo);
//app.use(express.static(path.join(__dirname, 'public')));

module.exports=app;