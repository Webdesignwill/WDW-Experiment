
var path = require('path'),
      rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development : {
    db : 'mongodb://127.0.0.1:27017/webdesignwill',
    root : rootPath
  }
};