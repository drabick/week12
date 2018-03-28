var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mustacheExpress = require('mustache-express');
mongoose.connect('mongodb://localhost/test');
let Book = require('./models/book');
var books = require('./routes/books');

var app = express();
//mustache engine set
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/books', books);

app.get('/', function (req, res) {
  Book.find(function (err, books) {
    if (err) return console.error(err);
    res.render('index', {books: books});
  })
});

app.get('/books/:id', function (req, res) {
  Book.findOne({_id: req.params["id"]}, function(err, book) {
    if (err) return console.error(err);
    res.render('book', {book: book});
  })
});

app.get('/books/', function (req, res) {
  res.render('bookn', {product: {} });
});

app.post('/books/', function(req, res, next) {
  let bookToCreate = new Book(req.body);
  bookToCreate.save(function(err, book){
  res.redirect("/");
  });
});

app.post('/books/delete/:id', function (req, res) {
  let id = req.params["id"]
  Book.deleteOne({_id: id}, function(err, book) {
    res.redirect("/");
  });
});

app.post('/books/update/:id', function (req, res) {
  let id = req.params["id"]
  Book.findOneAndUpdate({_id: id}, req.body, function(err, book) {
    if (err) return next(err);
    res.redirect("/");
  });
});

// If error respomd with 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Code to identify and catch errors
app.use(function(err, req, res, next) {
  // Developmental error handling
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Display error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
