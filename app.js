var express = require('express'),
	app  = express(),
	cons = require('consolidate');


//importando o módulo que será responsável pela conexão com a base e pelos modelos de dados
var database= require("./modules/dataBaseConnect.js");
//database.erro("testando a função criada no módulo");

database.ConectarBancoDeDados();





app.engine('html',cons.swig);
app.set('view engine','html');
app.set('views',	__dirname +	"/files/pages");


app.get('/',function(req,res){

	res.render('index',{nome:'Fernando',linguagem:'java'});


});





app.get('/node',function(req,res){

	res.render('index',{nome:'Fernando',linguagem:'node.js'});


});


app.get('*',function(req,res){

	res.send("Page not found",404);

});

app.listen(8080);
console.log("Express server running on port 8080");







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





















