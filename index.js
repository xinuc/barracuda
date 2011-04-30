var _ = require('./vendor/underscore')._;
var net = require('net');
var tictactoe = require('./lib/tictactoe/index');

var server = net.createServer(function(socket){
  _.each(["connect", "data", "end", "timeout", "drain", "error", "close"], function(event){
    socket.on(event, tictactoe.handlers[event]);
  });
});

server.listen(8808, 'localhost');
