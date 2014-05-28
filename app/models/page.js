
var mongoose = require('mongoose');

function toLower (str) {
  return str.toLowerCase();
}

var page = new mongoose.Schema({
  name : {
    type: String,
    set : toLower
  },
  order : Number,
  page : String,
  nav : Boolean,
  packages : Array,
  override : {
    route : String,
    path : String
  }
}, {strict : 'throw'});

module.exports = mongoose.model('Page', page);