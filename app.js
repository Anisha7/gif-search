// app.js 1

// INITIALIZE THE GIPHY-API LIBRARY
var giphy = require('giphy-api')();

var express = require('express');
var app = express();

// static files will live in public
app.use(express.static('public'));

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

// home page
app.get('/', function (req, res) {
  res.render('home')
});

// adding a search to the route
app.get('/', function (req, res) {
  console.log(req.query)
  res.render('home')
});

// REQUIRE HTTP MODULE
var http = require('http');

app.get('/', function (req, res) {
  var queryString = req.query.term;
  console.log(req.query.term)
  var queryString = "funny cat";
  // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
  var term = encodeURIComponent(queryString);
  // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

  http.get(url, function(response) {
    // SET ENCODING OF RESPONSE TO UTF8
    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d) {
      // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
      body += d;
    });

    response.on('end', function() {
      // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
      var parsed = JSON.parse(body);
      // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
      res.render('home', {gifs: parsed.data})
    });
  });
})

// connecting giphy api
app.get('/', function (req, res) {
  giphy.search(req.query.term, function (err, response) {
    res.render('home', {gifs: response.data})
  });
});

// route
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
app.js

// add templating engine
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
