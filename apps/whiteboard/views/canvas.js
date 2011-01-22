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
  }.observes('*lines.[]'),
  
  didCreateLayer: function(){
    var f = this.get('frame');
    this.$().attr({'width': f.width, 'height': f.height});
    var image = new Image();
    image.src = static_url("chalk-tile-white.png");
    this._image = image;
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
  touchStart:function(evt){
    //SC.Benchmark.start('down');
    var ctx = this._ctx || this.$()[0].getContext("2d"),
        currentLine = this._currentLine;
    //ctx.strokeStyle = ctx.createPattern(this._image, "repeat");
    ctx.beginPath();
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'black';
    ctx.lineWidth = 0.5;
    ctx.moveTo(evt.pageX,evt.pageY);
    //TODO: generate guid on mouseUp for better perf...
    //consider using points as a form of guid...
    currentLine = {guid: Whiteboard.guid(), color:'', start: {x: evt.pageX, y: evt.pageY}, points: [], thickness:''};
    this._alreadyDrawn[currentLine.guid] = true;
    this._ctx = ctx;
    this._currentLine = currentLine;
    //SC.Benchmark.end('down');
    return YES;
  },
  touchesDragged: function(evt, touches){
    var ctx = this._ctx || this.$()[0].getContext("2d");
    
    //TODO: optimize by only adding if not the same as last point
    ctx.lineTo(evt.pageX, evt.pageY);
    this._currentLine.points.pushObject({x: evt.pageX, y: evt.pageY});
    ctx.stroke();
    
    return YES;
  },
  
  touchEnd: function(evt){
    if(this._currentLine){
      var ctx = this._ctx || this.$()[0].getContext("2d"), lines = this.get('lines');
      
      //push final point...TODO make this work!
      ctx.lineTo(evt.pageX, evt.pageY);
      this._currentLine.points.pushObject({x: evt.pageX, y: evt.pageY});
      ctx.stroke();
      
      Whiteboard.sendLine(this._currentLine);
      
      //add the current line to the set..
      lines.pushObject(this._currentLine);
      this._currentLine = null;
    }
    
    return YES;
  },
  
  mouseDown: function(evt){
    return this.touchStart(evt);
  },
  mouseDragged: function(evt){
    return this.touchesDragged(evt);
  },
  mouseUp: function(evt){
    return this.touchEnd(evt);
  }
  
    


});
