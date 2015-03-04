
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.render('index');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/support', function(req, res){
  res.render('support');
});


http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
