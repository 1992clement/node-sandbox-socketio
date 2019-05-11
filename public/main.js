var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

app.get('/', function(req, res){
  res.setHeader('Content-Type', 'text/html');
  res.render('index.html.twig');
});

io.sockets.on('connection', function(socket){
  socket.on('pseudo', function(pseudo){
    socket.pseudo = pseudo;
    socket.broadcast.emit('msg', '<b>' + pseudo + ' s\'est connecté<b>');
  });

  socket.on('msg', function(msg){
    socket.broadcast.emit('msg', socket.pseudo + ' : ' + msg);
  });

});

server.listen(8080);
