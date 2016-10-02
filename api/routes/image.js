var Image = require('../models/image');

exports.create = function(req, res){
  var image = new Image();
  image.title = req.body.title;
  image.url = req.body.url;
  image.creationDate = new Date();
  image.isDeleted = req.body.isDeleted;

  image.save(function(err){
    if (err)
      res.send(err);
    res.json({message:'Image is created'});
  });

};

exports.list = function(req, res){
  Image.find({}, function(err,images){
    res.json(images);
  });
};
