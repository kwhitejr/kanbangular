var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    db = require('./models'),
    Card = db.Card,
    User = db.User,
    CONFIG = require('./config.json');


var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/api', function (req, res, next) {
  next();
});

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/api/users', function (req, res) {
  User.findAll()
    .then(function (results) {
      results.map(function (result) {
        return result.dataValues;
      });
      res.send(results);
    });
});

app.post('/card', function (req, res) {
  var data = req.body;
  console.log(data);
  var card = {
    title: data.title,
    status: "queue",
    priority: data.priority,
    creator_id: parseInt(data.creator_id),
    assignee_id: parseInt(data.assignee_id)
  };
  console.log(card);

  Card.create(card)
    .then(function (result) {
      console.log(result);
      return res.redirect('/');
    });
});

db.sequelize
  .sync()
  .then(function () {
    app.listen(CONFIG.PORT, function() {
      console.log('Listening to port', CONFIG.PORT);
    });
  }).catch(function (err) {
    console.log(err);
  });