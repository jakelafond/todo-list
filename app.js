const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  var todo = req.body.todo;
  console.log(todo);
  res.render('index');
});

app.listen(3000, (req, res) => {
  console.log('your app is working!');
});
