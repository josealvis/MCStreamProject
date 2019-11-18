var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();

var mediaRouter = require('./Routers/media');

var  loggerMiddlewere = (req, res, next)=> {console.log("Api called!"); next();};

app.use(cors());
app.use(loggerMiddlewere);

app.use(express.static(path.join(__dirname, '../build'))); 
/*Routers */
app.use('/',mediaRouter);

app.listen(4000, function () {
    console.log('the app is running in localHost:4000');
  });