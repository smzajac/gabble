const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const path = require('path');
const expressValidator = require('express-validator');
const parseurl = require('parseurl');
const models = require('./models');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
}));

models.User.findOne().then(function (user) {
  console.log(user);
});

app.get('/', function (req, res) {
  res.render('index');
  console.log('on main page')
})

app.post('/signup', function(req, res){
  const user = models.user.build({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })
  console.log(req.body);
  user.save().then(function(user){
    req.username = user.username;
    req.session.authendicated = true;
    res.redirect('/login')
    console.log(req.session);
  })
})



app.get('/signup', function(req, res){
  res.render('signup');
  console.log('signup page')
})

app.get('/logout', function(req, res){
  res.render('logout');
  console.log('logout page');
})

app.get('/liked', function(req, res){
  res.render('liked');
  console.log('liked page');
})

app.get('/login', function(req, res){
  res.render('login');
})


app.listen(3000, function(){
  console.log('launched!')
})
