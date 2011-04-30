var net = require('net');
var protocol = require('./lib/protocol');

var server = net.createServer(function(socket){
  socket.on("data", protocol.handler);
});

server.listen(8808, 'localhost');
