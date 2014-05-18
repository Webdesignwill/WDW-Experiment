
var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

function toLower (str) {
  return str.toLowerCase();
}

function doSomething (str) {
  return str;
}

var page = new Schema({
  name : {type: String, set : toLower, get : doSomething},
  order : Number,
  page : String,
  nav : Boolean,
  color : String,
  packages : Array,
  admin : Boolean,
  override : {
    route : String,
    path : String
  }
}, {strict : 'throw'});

module.exports = mongoose.model('pages', page);