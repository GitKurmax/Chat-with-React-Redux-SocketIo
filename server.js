var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let users = [];
app.get('/', function (req, res) {
    // res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
      socket.on('connected', function() {
      users.push({userId:socket.id});
      io.emit('new user connected', users);
    });
 
    console.log('a user connected');

    socket.on('disconnect', function(){
      let newUsers = users.filter((user) => user.userId !== socket.id);
      io.emit('user disconnected', newUsers);
      users = newUsers;
      });
      
    socket.on('message', function(message){
        socket.broadcast.emit('message', { for: 'everyone', message });
    });

    socket.on('files', function(data){
        socket.broadcast.emit('files', { for: 'everyone', data });
    });
  });

http.listen(3100, function () {
  console.log('Listening on port 3000!');
});