var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/book');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Book.find(function (err, books) {
    if (err) return console.error(err);
    res.json(books);
  })
});
// Post create a new record 
router.post('/', function(req, res, next) {
  let bookToCreate = new Book(req.body);
  bookToCreate.save(function(err, book){
    res.send(book);
    res.status(200).send();
  });
});
// Get record from DB based on ID passed
router.get('/:id', function(req, res, next) {
  Book.findOne({_id: req.params["id"]}, function(err, book) {
    if (err) return next(err);
    res.send(book);
    res.status(200).send();
  });
});
// Upate given record based on ID
router.put('/:id', function(req, res, next) {
  Book.findOneAndUpdate({_id: req.params["id"]}, req.body, function(err, book) {
    if (err) return next(err);
    res.status(204).send();
  });
});
//Delete record from DB based on ID passed
router.delete('/:id', function(req, res, next) {
  Book.deleteOne({_id: req.params["id"]}, function(err, book) {
    if (err) return next(err);
    res.status(204).send();
  });
});


module.exports = router;
