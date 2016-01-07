var express = require('express'),
	app  = express(),
	cons = require('consolidate');

  var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


var five = require("johnny-five");
var board = new five.Board();

//this variable contain a lot of variables using ins project
var variables = require('./public/resources/js/class/variables.js');



// app config
app.configure(function() {
  // Views directory
  app.set('views', __dirname + '/files/pages');
  // Static files directory
  app.use(express.static(__dirname + '/public'));
  // Disable layout
  app.set("view options", {layout: true});
  // Views engine
  app.set('view engine', 'jade');

});



// Render the main page
app.get('/', function(req, res) {
  res.render('index.jade' );
});




board.on("ready", function() 
{
          variables.led13 = new five.Led(13);
          variables.led12 = new five.Led(12);
          variables.led11 = new five.Led(11);
          variables.led10 = new five.Led(10);

          variables.setLed('13',variables.led13);
          variables.setLed('12',variables.led12);
          variables.setLed('11',variables.led11);
          variables.setLed('10',variables.led10);


});



io.sockets.on('connection', function (socket) 
{
  
  
    socket.on('atualizarStatus',function(data)
    {
     

        var pinIndex = data.pin.name;
        var pinStatus = data.pin.status;     

      
        variables.onAndOff(pinIndex,pinStatus);
        socket.broadcast.emit("atualizaStatusPinos", data );


    });


    socket.on('resposta', function (data) {

     

    });

    
});

  

// Start the server at port 3000
server.listen(9000, function() {
  console.log('Listening on port %d', server.address().port);
});
























