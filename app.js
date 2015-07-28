var express = require('express');
var app  = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var five = require("johnny-five");
var board = new five.Board();

var five = require("johnny-five");
// var board = new five.Board();

app.use("/", express.static(path.join(__dirname, '/files/pages')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/files/pages/index.html');
});

io.on('connection', function(socket ){




});



http.listen(9000, function(){
  console.log('listening on *:9000');
});