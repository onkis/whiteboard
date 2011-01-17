// ==========================================================================
// Project:   Whiteboard
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Whiteboard */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Whiteboard = SC.Application.create(
  /** @scope Whiteboard.prototype */ {

  NAMESPACE: 'Whiteboard',
  VERSION: '0.1.0',

  // ..........................................................
  // guid generation...need to move this to the server...
  // 
  s4: function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  },
  guid: function() {
     return (this.s4()+this.s4());
  },
  
  // ..........................................................
  // main actions
  // 
  createNew: function(){
    console.log('new');
    var message = {guid: this.guid(), createBoard: true, paths: []},
        board;
        
    this.socket.send(message);
    
    board = SC.Object.create(message);
    
    Whiteboard.boardController.set('content', board);

    Whiteboard.getPath('mainPage.startPane').remove();    
  },
  
  requestJoinBoard: function(id){
    Whiteboard.socket.send({joinBoard: true, guid: id});
  },
  
  
  joinBoard: function(message){
    var board = SC.Object.create(message);
    Whiteboard.boardController.set('content', board);
    Whiteboard.getPath('mainPage.startPane').remove();
  },
  
  sendLine: function(line){
    line.boardGuid = Whiteboard.boardController.get('guid');
    line.addPath = true;
    this.socket.send(line);
  },
  
  validateAndAddPath: function(message){
    var currGuid = Whiteboard.boardController.get('guid');
    if(currGuid === message.boardGuid){
      var paths = Whiteboard.pathsController.get('content');
      paths.pushObject(message);
    }
    else{
      console.log("guid didn't match don't add the line!");
    }
    
  }
  
}) ;
