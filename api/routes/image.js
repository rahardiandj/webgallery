/*module.exports = function(app){

    app.get('/images', function(req, res){
        res.json({
            message: 'Express Login'
        });
    });

    //other routes..
}*/

exports.list = function(req, res){
  res.json({
      message: 'Express Login'
  });
};
