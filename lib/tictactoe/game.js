var _ = require('../../vendor/underscore')._;
var Board = require('./board').Board;

var Game = function(player1, player2){
  var self = this;
  this.board = new Board();
  this.players = {
    1 : player1,
    2 : player2
  }

  this.index = function(player){
    if(self.players[1] == player){
      return 1;
    }else if(self.players[2] == player){
      return 2;
    }
    return null;
  }

  this.move = function(player, slot){
    var idx = self.index(player);
    var winner = self.board.move(idx, slot);
    _.each(self.players, function(p, idx){
      p.send(self.message((winner ? ((winner == idx) ? "win" : "lose") : null), self.board.isMoveNext(idx)));
    });
  }

  this.message = function(win, move){
    return JSON.stringify({
      board: self.board.slots,
      status: null,
      moving: move
    });
  }

  this.dismiss = function(){
    self.players[1].opponent = null;
    self.players[2].opponent = null;
    self.players[1].game = null;
    self.players[2].game = null;
  }

  this.start = function(){
    self.players[1].opponent = self.players[2];
    self.players[2].opponent = self.players[1];
    self.players[1].game = self;
    self.players[2].game = self;
    _.each(self.players, function(player, idx){
      player.send(JSON.stringify({playing: player.opponent.name}));
      player.send(self.message(null, self.board.isMoveNext(idx)));
    });
  }

}

exports.Game = Game;
