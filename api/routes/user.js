var User = require('../models/user');

exports.list = function(req, res){
  User.find({}, function(err,users){
    res.json(users);
  });
};


exports.create = function(req, res){
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

};
