"use strict";
// reference mongoose
let mongoose = require('mongoose');

// create book schema (class)
var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    author: {
        type: String,
        required: 'Author is required'
    },
    price: {
        type: Number,
        min: 0.01
    },
    year: {
        type: Number,
        min: 0
    }
});

// make it public
module.exports = mongoose.model('Book', bookSchema);