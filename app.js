
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');



app.get('/', function(req, res){
  res.render('index');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
