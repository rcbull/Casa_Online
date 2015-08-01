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

database.erro("testando a função criada no módulo");



app.use("/", express.static(path.join(__dirname, '/files/pages')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/files/pages/index.html');
});


io.on('connection', function(socket ){




});




//instanciando o módulo reponsável pela comunicação com o mongodb
var Mongoose = require('Mongoose');

var db = Mongoose.connection;
db.on('error', function()
{
	console.log('erro ao conectar na base de dados');

});;

db.once('open', function() {
  console.log('Conectado ao MongoDB.')
  // Vamos adicionar nossos Esquemas, Modelos e consultas aqui
});

Mongoose.connect('mongodb://localhost/test');










http.listen(9000, function(){
  console.log('listening on *:9000');
});