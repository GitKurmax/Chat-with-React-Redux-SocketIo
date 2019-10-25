var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    // res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('connected', function() {
      socket.broadcast.emit('new user connected');
    });

    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      
    socket.on('message', function(message){
        socket.broadcast.emit('message', { for: 'everyone', message });
    });

    socket.on('files', function(data){
        console.log(data);
        socket.broadcast.emit('files', { for: 'everyone', data });
    });
  });

http.listen(3100, function () {
  console.log('Listening on port 3000!');
});