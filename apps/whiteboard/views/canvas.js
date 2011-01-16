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
  
  lines: [],
  
  /*
    keeps track of all the lines already drawn
  */
  _alreadyDrawn: {},
  
  _newLineAdded: function(){
    this.displayDidChange();
  }.observes('lines.[]'),
  
  didCreateLayer: function(){
    var f = this.get('frame');
    this.$().attr({'width': f.width, 'height': f.height});
  },
  
  render: function(context, firstTime){
    if(!firstTime){
      var ctx = this.$()[0].getContext("2d"), 
          lines = this.get('lines'),
          alreadyDrawn = this._alreadyDrawn;
      lines.forEach(function(line){
        if(!alreadyDrawn[line.guid]){
          //TODO: add thickness and line color
          ctx.moveTo(line.start.x, line.start.y);
          
          line.points.forEach(function(pt){
            ctx.lineTo(pt.x,pt.y);
          });
          ctx.stroke();
          alreadyDrawn[line.guid] = true;
        }
      });  
    }
  },
  
  
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
  // ..........................................................
  // Events
  // 
  mouseDown:function(evt){
    var ctx = this._ctx || this.$()[0].getContext("2d"),
        currentLine = this._currentLine;
    
    ctx.beginPath();
    ctx.moveTo(evt.pageX,evt.pageY);
    currentLine = {color:'', start: {x: evt.pageX, y: evt.pageY}, points: [], thickness:''};
    SC.guidFor(currentLine);
    this._alreadyDrawn[currentLine._guid] = true;
    this._ctx = ctx;
    this._currentLine = currentLine;
    return YES;
  },
  mouseDragged: function(evt){
    var ctx = this._ctx || this.$()[0].getContext("2d");
    
    //TODO: optimize by only adding if not the same as last point
    ctx.lineTo(evt.pageX, evt.pageY);
    this._currentLine.points.pushObject({x: evt.pageX, y: evt.pageY});
    ctx.stroke();
    
    return YES;
  },
  
  mouseUp: function(evt){
    if(this._currentLine){
      var lines = this.get('lines');
      
      lines.pushObject(this._currentLine);
      this._currentLine = null;
    }
    
    return YES;
  }
    


});
