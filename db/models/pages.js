
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var page = new Schema({
  name : String,
  page : String,
  nav : Boolean,
  color : String,
  packages : Array,
  override : {
    route : String,
    path : String
  }
});

mongoose.model('pages', page);