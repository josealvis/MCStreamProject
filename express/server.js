var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();

var mediaRouter = require('./Routers/media');
var configRouter = require('./Routers/config');

var  loggerMiddlewere = (req, res, next)=> {console.log("Api called!"); next();};

app.use(cors());
app.use(loggerMiddlewere);
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var root = process.env.NODE_ENV === "development"? "../src":"../build"


app.use(express.static(path.join(__dirname, '../build'))); 

/*Routers */
app.use('/',mediaRouter);
app.use('/',configRouter);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log('the app is running in localHost:'+port);
  });