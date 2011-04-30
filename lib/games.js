var select = function(name) {
  var game = require("./games/" + name);
  return game.start();
}

exports.select = select;
