"use strict";
let mongoose = require('mongoose');

// this is needed to tell the app this model is for managing user accounts; it is not a regular model like book
let plm = require('passport-local-mongoose');
let findOrCreate = require('mongoose-findorcreate');

// create the schema.  username and password are automatically included
let accountSchema = new mongoose.Schema({});

// enable plm on this model
accountSchema.plugin(plm);
accountSchema.plugin(findOrCreate);

// make the model public
module.exports = mongoose.model('Account', accountSchema);