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
  },
  
  joinBoard: function(id){
    console.log(id);
  }
  
}) ;
