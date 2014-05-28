
var mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

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
  color : String,
  packages : Array,
  admin : Boolean,
  override : {
    route : String,
    path : String
  }
}, {strict : 'throw'});

module.exports = mongoose.model('Page', page);