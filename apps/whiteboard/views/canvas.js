// ==========================================================================
// Project:   Whiteboard.Canvas
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Whiteboard */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Whiteboard.Canvas = SC.View.extend(
/** @scope Whiteboard.Canvas.prototype */ {
  tagName: 'canvas',
  
  draw: function(){
    var ctx = this.$()[0].getContext("2d");
    
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.beginPath();
    ctx.moveTo(this._startX, this._startY);
    this.lines.forEach(function(i){
      ctx.lineTo(i.x,i.y);
    });
    ctx.stroke();
  },
  
  mouseDown:function(evt){
    this._startX = evt.pageX;
    this._startY = evt.pageY;
    this.lines = [];
    return YES;
  },
  
  mouseUp: function(evt){
    this.draw();
    return YES;
  },
  
  lines: [],
  
  mouseDragged: function(evt){
    this.lines.pushObject({x: evt.pageX, y: evt.pageY});
    return YES;
  }

});
