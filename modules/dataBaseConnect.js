
//função que demonstra o funcionamento dos módulos no node js
exports.ConectarBancoDeDados = function()
{

		//instanciando o módulo reponsável pela comunicação com o mongodb
		var Mongoose = require('Mongoose');

		var db = Mongoose.connection;
		
		db.on('error', function(err)
		{
			console.log('Erro ao tentar conectar a base de dados! : ',err);

		});;

		db.once('open', function() {
		  console.log('Conectado com sucesso ao MongoDB.')
		  // Vamos adicionar nossos Esquemas, Modelos e consultas aqui
		});

		Mongoose.connect('mongodb://localhost/CasaOnline');

}