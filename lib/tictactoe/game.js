var _ = require('../../vendor/underscore')._;
var routes =  require('./routes');

connectedSockets = []; // just make it global

var onConnect = function(){
  connectedSockets.push(this);
  console.log(connectedSockets.length);
}

var onData = function(data){
  var socket = this;
  var json = JSON.parse(data);
  var keys = _.keys(data);
  _.each(keys, function(key){
    routes.process(socket, key, json[key]);
  });
}

var onEnd = function(){
  
}

var onTimeout = function(){
  
}

var onDrain = function(){
  
}

var onError = function(){
  
}

var onClose = function(){
  
}

var handlers = {
  connect: onConnect,
  data: onData,
  end: onEnd,
  timeout: onTimeout,
  drain: onDrain,
  error: onError,
  close: onClose
}

exports.handlers = handlers;
