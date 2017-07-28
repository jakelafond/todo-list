const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');
var todos = [];
var completed = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
  res.render('index', { todos: todos, completed: completed });
});

app.post('/add', (req, res) => {
  todos.push(req.body.todo);
  res.redirect('/');
});

app.post('/completed', (req, res) => {
  var i = todos.indexOf(req.body.marked);
  if (i != -1) {
    todos.splice(i, 1);
    console.log(todos);
    completed.push(req.body.marked);
  }
  res.redirect('/');
});

app.listen(3000, (req, res) => {
  console.log('your app is working!');
});
