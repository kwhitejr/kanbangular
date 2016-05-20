var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    CONFIG = require('./config.json'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    isAuthenticated = require('./middleware/isAuthenticated'),
    RedisStore = require('connect-redis')(session),
    morgan = require('morgan'),
    db = require('./models'),
    Card = db.Card,
    User = db.User;


var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));


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
      if ( !user ) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

app.use(session({
  store: new RedisStore(
    {
      host: '127.0.0.1',
      port: '6379'
    }
  ),
  secret: CONFIG.SESSION.secret
}));

/****** I don't know what this does **********/
passport.serializeUser(function (user, done) {
  console.log('done: ', done);
  console.log('user: ', user);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log('done: ', done);
  console.log('user: ', user);
  return done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
/****** I don't know what this does **********/

//creates a default value for res.locals
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

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

app.post('/newUser', function (req, res, next) {
  var data = req.body;
  console.log(data);

  if (data.password1 === data.password2) {
    User.findOrCreate(
      {
        where: {
          username: data.username
        },
        defaults: {
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password1
        }
      }
    )
      .spread(function(user, created) {
        if (created) {
          console.log('great job, you signed up');

        } else {
          console.log('username already exists');
        }
      });
  } else {
    console.log('password does not match!');
  }
  res.sendFile(path.resolve('./public/login.html'));

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
      details: data.details,
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
    app.listen(CONFIG.CONSTANTS.PORT, function() {
      console.log('Listening to port', CONFIG.CONSTANTS.PORT);
    });
  }).catch(function (err) {
    console.log(err);
  });