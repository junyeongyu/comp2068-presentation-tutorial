"use strict";
// express setup
let express = require('express');
let router = express.Router();

// link to the book model for CRUD operations
let Book = require('../models/book');

// auth check
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next(); // user is logged, so call the next function
   }

   res.redirect('/'); // not logged in so redirect to home
}

/* GET books main page */
router.get('/', function(req, res, next) {

   // use mongoose model to query mongodb for all books
   Book.find(function(err, books) {
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }

      // no error so send the books to the index view
      res.render('books/index', {
         books: books,
         title: 'Book List',
          user: req.user
      });
   });
});

// GET /books/add - show blank add form
router.get('/add', isLoggedIn,  function(req, res, next) {
   // show the add form
   res.render('books/add', {
      title: 'Book Details',
       user: req.user
   });
});

// POST /books/add - save the new book
router.post('/add', isLoggedIn, function(req, res, next) {
   // use Mongoose to populate a new Book
   Book.create({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      year: req.body.year
   }, function(err, book) {
          if (err) {
             console.log(err);
             res.render('error');
             return;
          }
         res.redirect('/books');
   });
});

// GET /books/delete/_id - delete and refresh the index view
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
   // get the id parameter from the end of the url
   let _id = req.params._id;

   // use Mongoose to delete
   Book.remove({ _id: _id }, function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/books');
   });
});

// GET /books/_id - show edit page and pass it the selected book
router.get('/:_id', isLoggedIn, function(req, res, next) {
   // grab id from the url
   let _id = req.params._id;

   // use mongoose to find the selected book
   Book.findById(_id, function(err, book) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.render('books/edit', {
         book: book,
         title: 'Book Details',
          user: req.user
      });
   });
});

// POST /books/_id - save the updated book
router.post('/:_id', isLoggedIn, function(req, res, next) {
   // grab id from url
   let _id = req.params._id;

   // populate new book from the form
   let book = new Book({
      _id: _id,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      year: req.body.year
   });

   Book.update({ _id: _id }, book,  function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/books');
   });
});

// make this file public
module.exports = router;
