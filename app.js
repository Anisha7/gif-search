// app.js 1

// INITIALIZE THE GIPHY-API LIBRARY
var giphy = require('giphy-api')();

var express = require('express');
var app = express();

// add templating engine
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// REQUIRE HTTP MODULE
var http = require('http');
// static files will live in public
app.use(express.static('public'));

// connecting giphy api
app.get('/', function (req, res) {
  giphy.search(req.query.term, function (err, response) {
    res.render('home', {gifs: response.data})
  });
});

// get hello gif
app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
});

// index.js
app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
});


// route
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
app.js
