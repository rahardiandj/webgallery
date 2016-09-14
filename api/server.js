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

var dbURI = config.database; 

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});


//mongoose.connect(config.database);
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
app.use('/api', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/authenticate')
  .post(function(req,res){
    User.findOne({
      email:req.body.email
    },function(err, user){
      if (err) throw err;

      if (!user){
        res.json({success:false, message:'Authentication Failed! Username not found'})

      } else if (user){
        if (user.password != req.body.password){
          res.json({success:false, message: 'Authentication Failed! Password is incorrect'})
        }else {
          var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60*60*24 // expires in 24 hours
        });

          res.json({
            success: true,
            message: 'Enjoy your token',
            token: token
          })
        }
      }
    })
  });


router.use(function(req, res, next){
  console.log(req.headers);
  //check token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'),function(err,decoded){

      if (err){
        return res.json({success: false, message: 'Failed to Authenticate'})
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(403).send({
      success:false,
      message:'No token provided'
    });
  }

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
    User.find({}, function(err,users){
      res.json(users);
    });
  });



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);
