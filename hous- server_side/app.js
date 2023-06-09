
var express = require("express");
var http = require("http");
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var path = require('path');
var house = require('./routes/house');
var app = express();
app.use(express.static('public'));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers","Origin, X-Reqested-With, Content-Type, Accept, Authoriztion")
  if(req.method==="OPTIONS"){
      res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET")
      return res.status(200).json({})
  }
  next()
  })
app.use(express.urlencoded({ extended: false }));
//path to client side
app.use('/house',express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
//path to /api/house
app.use('/api/houses', house);
app.use(function(req, res, next) {
  next(createError(404));
});
//error path
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(`<html> <head>Error</head><body><h1> ${err.message} </h1></body></html>`);
});
const server=http.createServer(app)
server.listen(8000)