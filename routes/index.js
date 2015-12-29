var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  var yolos = new User;
  yolos.favorite = "doing naughty things";
  yolos.name = "DMX";
  yolos.sayHello();
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log("Posting time! ",req.body.castle);
  var sup = new User;
  sup.userName = req.body.username;
  sup.castle = req.body.castle;
  sup.save();
  res.render('index', { title: 'Express' });
});

router.get("/names",function(req,res){
  User.find({},function(err,names){
    res.send(JSON.stringify(names));
  });
});

module.exports = router;
