// SproutCore ViewBuilder Design Format v1.0
// WARNING: This file is automatically generated.  DO NOT EDIT.  Changes you
// make to this file will be lost.
/*global Whiteboard*/
Whiteboard.mainPage = SC.Page.design({
  mainPane: SC.MainPane.design({
    childViews: 'canvas'.w(),
    canvas: Whiteboard.Canvas.design({
      
    }),
    
    socket: SC.View.design({
      render: function(context, firstTime){
        context.push("<script src=\"http://localhost:3002/socket.io/socket.io.js\"></script> \
        <script> \
         var socket = new io.Socket('localhost', {port: 3002}); console.log('dorks');\
         socket.on('connect', function(){console.log('connected');}); \
         socket.on('message', function(){console.log('message');}); \
         socket.on('disconnect', function(){}); \
        </script>");
      }
    })
    
    
  }),
  pageName: "Whiteboard.mainPage"
});
