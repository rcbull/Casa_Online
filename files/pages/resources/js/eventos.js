$(document).ready(function()
{
 	bindAllBtnEvent();
	
});

function addIconChange(object)
{
	var icon = object;
	var iconPowerOn = 'power_settings_new';
	var iconePowerOff = 'not_interested';

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
		addIconChange(icon);
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