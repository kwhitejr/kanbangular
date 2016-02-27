var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    db = require('./models'),
    CONFIG = require('./config.json');


var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/api', function (req, res, next) {

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