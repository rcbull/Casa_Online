exports.led13 ;
exports.led12 ;
exports.led11 ;
exports.led10 ;

exports.ledA0;
exports.stateLedA0 =new Array();

exports.contadorLedA0=0;
exports._stateLedA0='off';
exports.lastStateLedA0='off';
exports.skt;


exports.sensorValue_aux = 0;
exports.valorSensor = 0;
exports.valorCorrente = 0;
exports.voltsporUnidade = 0.004887586;// 5%1023
// Para ACS712 de  5 Amperes use 0.185
// Para ACS712 de 10 Amperes use 0.100
//  Para ACS712 de 5 Amperes use 0.066
exports.sensibilidade = 0.066;
//Tensao da rede AC 110 Volts e na verdade (127 volts)
exports.tensao = 220;


var leds = new Array();
var statusPin = new Array();

exports.statusPin = statusPin ; 
exports.leds = leds ; 




//methods
module.exports.onAndOff = function (ledName,status)
{	
	var led = leds[ledName];
	
	//console.log(status);

		if (status == 'on')
		{
			led.off();
			statusPin[ledName] = 'off' ;




		}else if(status == 'off')
		{
			led.on();
			statusPin[ledName] = 'on' ;

		}

		
	

}





module.exports.setLed = function (index,led)
{
	leds[index] = led ;

}


