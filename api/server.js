//server.js
//BASE SETUP


var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan     = require('morgan');         //log module

var jwt        = require('jsonwebtoken');
var config     = require('./config');
//Connect to mongodb
var mongoose = require('mongoose');
mongoose.connect(config.database);
app.set('superSecret', config.secret);

//Models
var User = require('./models/user');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next){
  console.log('API\'s call is comming');
  next();
});

router.route('/users')
  .post(function(req, res){
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.admin = req.body.admin;

    user.save(function(err){
      if (err)
        res.send(err);
      res.json({message: 'email : ' + user.email +
        'pass : ' + user.password+ ' admin : ' + user.admin});
    });

  })

  .get(function(req, res){
    res.json({message:"test"});
  });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);
