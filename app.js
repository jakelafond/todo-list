const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: 'the one and only',
    resave: false,
    saveUninitialized: true
  })
);

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
  const todosOpen = req.session.todosOpen || [];
  const todosCompleted = req.session.todosCompleted || [];

  res.render('index', { todosOpen, todosCompleted });
});

app.post('/add', (req, res) => {
  const todosOpen = req.session.todosOpen || [];
  const todosCompleted = req.session.todosCompleted || [];

  todosOpen.push(req.body.todo);

  req.session.todosOpen = todosOpen;

  res.redirect('/');
});

app.post('/completed', (req, res) => {
  const todosOpen = req.session.todosOpen || [];
  const todosCompleted = req.session.todosCompleted || [];

  var i = todosOpen.indexOf(req.body.marked);
  if (i != -1) {
    todosOpen.splice(i, 1);
    console.log(todosOpen);
    todosCompleted.push(req.body.marked);
  }

  req.session.todosCompleted = todosCompleted;

  res.redirect('/');
});

app.listen(3000, (req, res) => {
  console.log('your app is working!');
});
