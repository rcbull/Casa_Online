$(document).ready(function()
{
 	bindAllBtnEvent();

	var socket = io.connect();
 	

	socket.on('atualizaStatusPinos', function (data) {
	

	   		var iconeName = '#pino'+data.pin.name;
	   		var icone = $(iconeName).children();
	   	
	   		addIconChange(icone);
		
  	});		
});

function addIconChange(object)
{
	var icon = object,
	 iconPowerOn = 'power_settings_new',
	 iconePowerOff = 'not_interested',
	 on = "on",
	 off = "off";

	 var parentIcon =$(icon.parent());


 	if(parentIcon.attr('status') == on)
	{
		parentIcon.attr('status',off);

	}else if(parentIcon.attr('status')==off)
	{
		parentIcon.attr('status',on);
	}

	switch(icon.html())
	{
		
		case iconPowerOn:
			icon.html(iconePowerOff);
			break;
		case iconePowerOff:
			icon.html(iconPowerOn);
			break;
	}


}

function addBtnClick(btn)
{
	var button = btn ;
	var icon = $(button.children());

	button.unbind('click');
	button.bind('click',function(e)
	{
		e.preventDefault();
		
	
		var objClicked = $(this);

		var msg = icon.attr('id');
		var pinName = objClicked.attr('pin');
		var pinStatus = objClicked.attr('status');

		//Formatando json com status e indice de referência do pino do arduino que esta sendo manipulado
		var pin = 
				 {
					name : pinName,
					status : pinStatus				 	
				 };



		var socket = io.connect();
		var socketPinEmit = "pin"+pinName;

		addIconChange(icon);
		
		//emitindo mensagem para o servidor informando que o estado do pino foi alterado
		socket.emit("atualizarStatus",{pin : pin});
	
		
	
	});



}

function bindAllBtnEvent()
{
	var buttons = $('.btnAction');
	var lengthButtons = buttons.length;

	for (var i = 0; i < lengthButtons; i++) 
	{
		var btn = buttons[i];
		
		addBtnClick($(btn));
	};
}