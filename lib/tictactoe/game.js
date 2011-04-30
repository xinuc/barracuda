var _ = require('../../vendor/underscore')._;
var Board = require('./board').Board;

var Game = function(player1, player2){
  var self = this;
  this.board = new Board();
  this.players = {
    1 : player1,
    2 : player2
  }
  this.indexes = [player1, player2];

  this.move = function(player, slot){
    var idx = _.indexOf(self.indexes, player) + 1;
    var winner = self.board.move(idx, slot);
    console.log("moving index: "+ idx);
    _.each(self.players, function(p, idx){
      console.log("winner: "+winner+" idx: "+idx);
      var stat = (winner == 0) ? null : ((winner == idx) ? "win" : "lose");
      p.send(self.message( stat, self.board.isMoveNext(idx)));
    });
  }

  this.message = function(win, move){
    return JSON.stringify({
      board: self.board.slots,
      status: win,
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
