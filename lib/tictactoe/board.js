var _ = require('../../vendor/underscore')._;

var Board = function(){
  var self = this;
  this.slots = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  this.checkWinner = function(){
    var winningRows = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

    winner = 0;

    _.each(winningRows, function(row){
      var sum = _.reduce(row, function(count, idx){
        return count + self.slots[idx];
      }, 0);

      if(sum == 3){
        winner = 1;
      }else if(sum == -3){
        winner = 2;
      }

    });
    return winner;
  }

  this.move = function(player, slot){
    (player == 1) ?  (self.slots[slot - 1] = 1) : (self.slots[slot - 1] = -1);
    return self.checkWinner();
  }

  this.isMoveNext = function(player){
    var sum = _.reduce(self.slots, function(count, slot){
      return count + slot;
    }, 0);
    return (player - sum == 1);
  }
}

exports.Board = Board;
