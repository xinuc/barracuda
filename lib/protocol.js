var games = require('./lib/games');

var keywords = {
}

var handler = function(data){
  this.write("you just write "+data);
}

exports.handler = handler;
