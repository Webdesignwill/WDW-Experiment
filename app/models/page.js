
var mongoose = require('mongoose');

function toLower (str) {
  return str.toLowerCase();
}

var page = new mongoose.Schema({
  name : {
    type: String,
    set : toLower,
    unique : true
  },
  order : Number,
  page : {
    view : String,
    template : String
  },
  nav : Boolean,
  packages : Array,
  override : {
    route : String,
    path : String
  }
});

module.exports = mongoose.model('Page', page);