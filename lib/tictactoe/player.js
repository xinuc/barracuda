//var _ = require('../../vendor/underscore')._;
var Player = function(name, socket){
  var self = this;
  this.name = name;
  this.socket = socket;
  this.game = null;
  this.opponent = null;

  this.move = function(slot){
    if(self.game){
      self.game.move(self, slot);
    }else{
      console.error(self.name + " don't have any game");
    }
  }

  this.send = function(string){
    self.socket.write(string);
  }

  this.send(JSON.stringify({response: "accepted"}));
}

exports.Player = Player;
