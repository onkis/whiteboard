// ==========================================================================
// Project:   Whiteboard
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Whiteboard io*/

Whiteboard.main = function main() {
  //setup panes
  Whiteboard.getPath('mainPage.mainPane').append();
  Whiteboard.getPath('mainPage.startPane').append();

  // ..........................................................
  // setup the socket io connection
  // 
  var socket = new io.Socket(null, {port: 3002, rememberTransport: false});
  socket.connect();
  socket.on('connect', function(){ 
    console.log('connected to server');
    socket.send('dorks');
  }); 
  
  socket.on('message', function(message){
    if(message.boardJoin){
      Whiteboard.joinBoard(message);
    }
    else if(message.addPath){
      console.log('got message add path');
      Whiteboard.validateAndAddPath(message);
    }
    else{
      console.log("didn't know what to do with message...");
      console.log(message);
    }
    
  });
  
  
  
  
  socket.on('disconnect', function(){ });
  
  Whiteboard.socket = socket;
  

} ;

function main() { Whiteboard.main(); }
