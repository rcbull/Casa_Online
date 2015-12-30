var express = require('express'),
	app  = express(),
	cons = require('consolidate');

  var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

  var statusPin = Array();



//importando o módulo que será responsável pela conexão com a base e pelos modelos de dados
//var database= require("./modules/dataBaseConnect.js");
//database.erro("testando a função criada no módulo");

//database.ConectarBancoDeDados();





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




io.sockets.on('connection', function (socket) 
{
  
  
    socket.on('atualizarStatus',function(data)
    {
     

        var pinIndex = data.pin.name;
        var pinStatus = data.pin.status; 

        statusPin[pinIndex] = pinStatus ;


        socket.broadcast.emit("atualizaStatusPinos", data );
      


    });


    socket.on('resposta', function (data) {
    
     

    });
});

// Start the server at port 3000
server.listen(9000, function() {
  console.log('Listening on port %d', server.address().port);
});





/* backup

var express = require('express');
var app  = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


//importando o módulo responsável por efetuar a comunicação do node com o arduino
var five = require("johnny-five");

//instanciando uma placa que deve estar conectada ao servidor
var board = new five.Board();

//importando o módulo que será responsável pela conexão com a base e pelos modelos de dados
var database= require("./modules/dataBaseConnect.js");
//database.erro("testando a função criada no módulo");

database.ConectarBancoDeDados();




//criando a rota do servidor
app.use("/", express.static(path.join(__dirname, '/files/pages')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/files/pages/index.html');
});


io.on('connection', function(socket ){




});





*/





















