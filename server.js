var express = require('express'),
    path = require('path'),
    CONFIG = require('./config.json');


var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));


app.use('/api', function (req, res, next) {

});

var server = app.listen(CONFIG.PORT, function() {
  console.log('Listening to port', CONFIG.PORT);
});