var _ = require('../../vendor/underscore')._;
var Player = require('./player').Player;
var Game = require('./game').Game;

var connectedPlayers = {};
var players = [];
var games = [];

var onSubscribe = function(socket, name){
  var player = new Player(name, socket);
  players.push(player);
  connectedPlayers[socket.remotePort] = player;
  console.log("connectedPlayers size: "+ _.size(connectedPlayers));
  var opponent = findOpponent(player);
  if(opponent){
    console.log("Got opponent " + opponent.name);
    var game = new Game(player, opponent);
    games.push(game);
    game.start();
  }else{
    console.log("Got no opponent");
  }
}

var findOpponent = function(player){
  return _.select(_.without(players, player), function(p){
    var isnull = _.isNull(p.game);
    return isnull;
  })[0];
}

var onMove = function(socket, slot){
  var player = connectedPlayers[socket.remotePort];
  player.move(slot);
}

var handlers = {
  subscribe: onSubscribe,
  move: onMove
}

var process = function(socket, key, data){
  handlers[key](socket, data);
}

exports.process = process;
