// ==========================================================================
// Project:   Whiteboard
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Whiteboard io*/

Whiteboard.main = function main() {
 
  Whiteboard.getPath('mainPage.mainPane').append();
  Whiteboard.getPath('mainPage.startPane').append();

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: Whiteboard.contactsController.set('content',Whiteboard.contacts);
  var socket = new io.Socket(null, {port: 3002, rememberTransport: false});
  socket.connect();
  socket.on('connect', function(){ 
    console.log('connected to server');
    socket.send('dorks');
  }); 
  socket.on('message', function(){ });
  socket.on('disconnect', function(){ });
  
  

} ;

function main() { Whiteboard.main(); }
