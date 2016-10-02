// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  title: String,
  url: String,
  creationDate: Date,
  isDeleted: Boolean
}, { collection: 'image' });

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('image', imageSchema);
