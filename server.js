// app.js 1
const PORT = process.env.PORT || 5000
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
    console.log(req)
    if (req.query.term) {
  giphy.search(req.query.term, function (err, response) {
    res.render('home', {gifs: response.data})
    console.log(response);
  });
}
    else {
        giphy.trending(function (err, response) {
            res.render('home', {gifs: response.data})
            console.log(response);
        })
    }
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
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
