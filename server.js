var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    isAuthenticated = require('./middleware/isAuthenticated'),
    morgan = require('morgan'),
    db = require('./models'),
    Card = db.Card,
    User = db.User,
    CONFIG = require('./config.json');


var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(session({ secret: CONFIG.SESSION.secret }));

passport.use(new LocalStrategy(
  {
    passReqToCallback: true
  },
  function (req, username, password, done) {
    console.log('username: ', username);
    console.log('password: ', password);
    User.findOne({
      // where: {
        username: username,
        password: password
      // }
    }).
    then(function (user) {
      console.log(user);
      if ( !user ) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

/****** I don't know what this does **********/
passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
/****** I don't know what this does **********/


app.use('/#', function (req, res, next) {
  isAuthenticated();
  next();
});

app.use('/api', function (req, res, next) {
  next();
});

app.route('/login')
  .get(
    function (req, res) {
      res.sendFile(path.resolve('./public/login.html'));
  })
  .post(
    function (req, res, next) {
      console.log(req.body);
      next();
    },
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
);

app.get('/',
  isAuthenticated,
  function (req, res) {
    res.sendFile(path.resolve('./public/dashboard/index.html'));
  });

app.get('/api/users', function (req, res) {
  User.findAll()
    .then(function (results) {
      results.map(function (result) {
        return result.dataValues;
      });
      res.json(results);
    });
});

app.get('/api/cards', function (req, res) {
  Card.findAll()
    .then(function(results) {
      results.map(function (result) {
        return result.dataValues;
      });
      res.json(results);
    });
});

// app.get('/api/editCard/:id', function (req, res) {

// });

app.post('/api/newUser', function (req, res) {
  var data = req.body;
  console.log(data);

  return User
    .create(data)
    .then(function (result) {
      return res.json(result);
    });
});

app.post('/api/newCard', function (req, res) {
  var data = req.body;
  console.log(data);

  return Card
    .create(data)
    .then(function (result) {
      return res.json(result);
    });
});

app.post('/api/update', function (req, res) {
  var data = req.body;

  Card.update(
    {status: data.newStatus},
    {where:
      {id: data.id}
    }
  )
    .then(function (results) {
      res.json(results);
    });
});

app.post('/api/update/:id', function (req, res) {
  var data = req.body;
  console.log(data);

  Card.update(
    {
      title: data.title,
      creator_id: data.creator_id,
      assignee_id: data.assignee_id,
      priority: data.priority,
      status: data.status
    },
    {where:
      { id: data.id }
    }
  )
    .then(function (results) {
      res.json(results);
    });
});

app.post('/api/delete', function (req, res) {
  var data = req.body;

  Card.destroy(
    {
      where:
        {id: parseInt(data.id)}
    }
  )
  .then(function (results) {
      res.json(results);
    });
});

app.post('/api/delete/:id', function (req, res) {
  var data = req.params;
  console.log(data);

  Card.destroy(
    {
      where:
        {id: parseInt(data.id)}
    }
  )
  .then(function (results) {
      res.json(results);
    });
});

db.sequelize
  .sync() // attempts to match the database to the models
  .then(function () {
    app.listen(CONFIG.PORT, function() {
      console.log('Listening to port', CONFIG.PORT);
    });
  }).catch(function (err) {
    console.log(err);
  });