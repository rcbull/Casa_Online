exports.led13 ;
exports.led12 ;
exports.led11 ;
exports.led10 ;
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


