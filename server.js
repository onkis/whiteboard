var http = require('http'),  
    io = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io') 
    sys = require("sys"), //TODO: what is this for?
    redis = require("redis-node"),
    server, socket, db; //woot!

// Create the redis client
db = redis.createClient();
db.select(2); //select DB 2 whatever that does?...

//startup your standard http server
server = http.createServer();
server.listen(3002); 
  
// socket.io 
socket = io.listen(server);

socket.on('connection', function(client){
  console.log("connected to client"); 
  //let everyone know we're here
  client.broadcast({ announcement: client.sessionId + ' connected' });
  
  
  //incomming! 
  client.on('message', function(message){
    console.log(message);
    //board creation {guid, createBoard: true}
    if(message.createBoard){
      console.log('creating a board');
      db.set(message.guid, JSON.stringify(message));
    }
    //adding a path: {boardGuid : '', addPath: true, path: {}}
    else if(message.addPath){
      console.log('adding a path');
      db.sadd(message.boardGuid+":paths", JSON.stringify(message.path));
      client.broadcast(message); //TODO: setup a special sessions client list to send to
    }
    //board retrevial
    else if(message.joinBoard){
      db.get(message.guid, function(err,val){
        if(err) throw err;
        if(val){
         var ret = JSON.parse(val);
         ret.paths = [];
         //collect all the paths...
         db.smembers(ret.guid+":paths", function(err, val){
           if(err) throw err;
           
           for(var i=0, l = val.length; i<l; i++){
             ret.paths.push(JSON.parse(val[i]));
           }
           client.send(ret);
         }); 
        }
      });
      
    }
    else{
      console.log("Got a message we didn't do jack with...");
    }
    
    
    
  });
  
  client.on('disconnect', function(){}); 
});