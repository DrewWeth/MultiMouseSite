
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
// var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var localUrl = 'mongodb://localhost:27017/myproject';
var bodyParser = require('body-parser');
var mongo = null;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded


// npm install mongodb

var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.MONGOSOUP_URL || localUrl, function(err, db) {
  if(err) {
    console.log("failed to connect to the database");
  } else {
    console.log("connected to database");
  }
  mongo = db;
});



// GET URLs

app.get('/', function(req, res){
  res.render('index');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/support', function(req, res){
  res.render('support');
});

// POST URLs

app.post('/bug-form', function(req, res){
  // console.log(req.body.form);
  insertDocuments(mongo, req.body.form, function(result){
    console.log(result);
  });
  res.render('index', {script:"Thank you for submitting a bug. We'll check it out ASAP and get back with you!"});
});

app.post('/press-form', function(req, res){
  // console.log(req.body.form);
  res.render('index', {script:"Thanks for the inquiry, we'll get back with you soon."});
  insertDocuments(mongo, req.body.form, function(result){
    console.log(result);
  });
});

app.post('/other-form', function(req, res){
  // console.log(req.body.form);
  res.render('index', {script:"We got it! We'll get back with you soon."});
  insertDocuments(mongo, req.body.form, function(result){
    console.log(result);
  });
});


var insertDocuments = function(db, form, callback) {
  // Get the documents collection
  var collection = db.collection('forms');
  // Insert some documents
  collection.insert([
    form
  ], function(err, result) {

    callback(result);
  });
}

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
