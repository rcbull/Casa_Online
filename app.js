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


io.sockets.on('connection', function (socket) 
{
  
  
    socket.on('atualizarStatus',function(data)
    {
     
        //console.log(data);
        var pinIndex = data.pin.name;
        var pinStatus = data.pin.status;     

      
        variables.onAndOff(pinIndex,pinStatus);
        socket.broadcast.emit("atualizaStatusPinos", data );


    });

    variables.skt = socket;
   

    
});



board.on("ready", function() 
{
          variables.led13 = new five.Led(13);
          variables.led12 = new five.Led(12);
          variables.led11 = new five.Led(11);
          variables.led10 = new five.Led(10);
          variables.ledA0 = new five.Sensor("A0");

          variables.setLed('13',variables.led13);
          variables.setLed('12',variables.led12);
          variables.setLed('11',variables.led11);
          variables.setLed('10',variables.led10);
 



     variables.ledA0.on("data", function() 
    {    

 
        if(typeof variables.skt != 'undefined')
        {

          AvaliarEstadoSensor(this.value);
        }
    });


});






function AvaliarEstadoSensor(valorLido)
{
  
  variables.contadorLedA0++;
  //console.log(variables.contadorLedA0);




  if(variables.contadorLedA0 < 100)
  {
    // le o sensor na pino analogico A0 e ajusta o valor lido ja que a saída do sensor é (1023)vcc/2 para corrente =0
    variables.sensorValue_aux = (valorLido -510);
    // somam os quadrados das leituras.
    variables.valorSensor += Math.pow(variables.sensorValue_aux,2);
    
  }else if(variables.contadorLedA0 == 100)
  {

  // finaliza o calculo da média quadratica e ajusta o valor lido para volts
  variables.valorSensor = (Math.sqrt(variables.valorSensor/ 100)) * variables.voltsporUnidade;
  // calcula a corrente considerando a sensibilidade do sernsor (185 mV por amper)
  variables.valorCorrente = (variables.valorSensor/variables.sensibilidade);
 
  //tratamento para possivel ruido
  //O ACS712 para 30 Amperes é projetado para fazer leitura
  // de valores alto acima de 0.25 Amperes até 30.
  // por isso é normal ocorrer ruidos de até 0.20A
  //por isso deve ser tratado
  //console.log("Corrente:"+variables.valorCorrente);
  if(variables.valorCorrente <= 0.099){

    variables.valorCorrente = 0;   
    
      //console.log('Desligado <------------');

      if(variables.lastStateLedA0=='off')
      {
        console.log('Desligado <------------');




        if(variables._stateLedA0 == 'on'){
          
          var pin = 
           {
            name : '13',
            status : 'on'          
           };

           variables._stateLedA0 == 'off';

          variables.skt.emit('atualizarStatus',{pin:pin})
          variables.skt.broadcast.emit('atualizaStatusPinos',{pin:pin});
        }

      }else
      {
           console.log('---------------- > Status Alterado(Desligado) <------------------');
            variables.lastStateLedA0='off';

      }
    
     //console.log("Corrente interno:"+ variables.valorCorrente);

   

  }

    if(variables.valorCorrente > 0)
    {
      console.log(variables.valorCorrente);

      if(variables.lastStateLedA0=='off')
      {
        console.log('---------------- > Ligado');
        console.log(variables._stateLedA0 == 'off');

        if(variables._stateLedA0 == 'off'){
          
          var pin = 
           {
            name : '13',
            status : 'off'          
           };

           variables._stateLedA0 == 'on';

          variables.skt.emit('atualizarStatus',{pin:pin});
          variables.skt.broadcast.emit('atualizaStatusPinos',{pin:pin});
        }


      }else
      {
           console.log('---------------- > Status Alterado (Ligado)<------------------');
           variables.lastStateLedA0='on';

      }
    }

    //zerando variáveis
     variables.sensorValue_aux=0;
     variables.valorSensor =0;
     variables.valorCorrente=0
     variables.contadorLedA0=0; 

  }
  

}
  

// Start the server at port 3000
server.listen(9000, function() {
  console.log('Listening on port %d', server.address().port);
});
























