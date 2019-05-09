var express = require('express');
var Twig = require('twig');
var cookieSession = require('cookie-session');
var app = express();

app.set('view engine', 'twig');
app.set('views', __dirname + '/views');
app.use(express.urlencoded());
app.use(cookieSession({
  name: "session",
  secret: "s3cur3"
}));

app.get('/', function(req, res){
  if(req.session.todolist === undefined){
    req.session.todolist = [];
  }
  res.setHeader('Content-Type', 'text/html');
  res.render('index.html.twig', {todolist: req.session.todolist});
});

app.post('/new', function(req, res){
  req.session.todolist.push({name: req.body.task, done: false});
  res.redirect('/');
});

app.get('/done/:id', function(req, res){
  req.session.todolist[req.params.id].done = true;
  res.redirect('/');
});

app.listen(8080);
