var _ = require('../../vendor/underscore')._;
var routes =  require('./routes');

//connectedSockets = []; // global

var onConnect = function(){
  //connectedSockets.push(this);
  console.log("client connected");
}

var onData = function(data){
  console.log("data received");
  var socket = this;

  //try {
    var json = JSON.parse(data);
    console.dir(json);

    var keys = _.keys(json);
    _.each(keys, function(key){
      routes.process(socket, key, json[key]);
    });
  //} catch (err) {
    //console.error("Not a valid json:");
    //console.log(data.toString());
  //}
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
