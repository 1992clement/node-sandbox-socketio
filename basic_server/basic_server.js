/**
  Dans la console, lancer 'node basic_server.js'
  Le script va :
    - faire un console.log('test successful'), pour tester l'export/import de modules perso
    - faire un console.log('Game over man !'), pour tester l'émission d'events
    - lancer un server. Ajouter un handler sur l'event 'close' du server. Puis le fermer.
    - À la fermeture du server : console.log('server shot down');
**/

var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;
var require_test = require('require_test');

require_test.test();

var jeu = new EventEmitter();
jeu.on('gameOver', function(message){
  console.log(message);
});
jeu.emit('gameOver', 'Game over man !');

var server = http.createServer(function (req, res){

  var page = url.parse(req.url).pathname;
  var urlparams = querystring.parse(url.parse(req.url).query);

  console.log(page);
  console.log(urlparams);

  var response = "";
  var header = {"Content-Type" : "text/html"};
  var code = 200;

  switch(page) {
    case '/':
      response = "<h1>Accueil</h1>"
      break;
    case '/toto':
      response = "Toto"
      break;
    default:
      response = "Error"
      code = 404;
      break;
  }

  if ("name" in urlparams) {
    response += "<br><br>" + urlparams["name"];
  }

  res.writeHead(code, header);
  res.write(response);
  res.end();

});

server.on('close', function(){
  console.log('server shot down');
});

server.listen(8080);
server.close();
