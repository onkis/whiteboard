var http = require('http'),  
    io = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io') 

server = http.createServer(function(req, res){ 
 // your normal server code 
 res.writeHeader(200, {'Content-Type': 'text/html'}); 
 res.writeBody('<h1>Hello world</h1>'); 
 res.finish(); 
});
server.listen(3002); 
  
// socket.io 
var socket = io.listen(server); 
socket.on('connection', function(client){ 
  // new client is here! 
  client.on('message', function(){});
  client.on('disconnect', function(){}); 
});