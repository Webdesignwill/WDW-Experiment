
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name : String,
  age : Number,
  email : String,
  password : String
});

mongoose.model('users', usersSchema);