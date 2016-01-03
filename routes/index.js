var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
  var yolos = new User;
  yolos.favorite = "doing naughty things";
  yolos.name = "DMX";
  yolos.sayHello();
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log("Posting time! ",req.body.castle);
  var userName = req.body.userName;
  var castle = req.body.castle;
  User.findOneAndUpdate({userName: userName }, {castle: castle }, function(err, user) {
  if (err) console.log(err);
  console.log(user);
  });
});

router.post("/names",function(req,res){
  var userName = req.body.userName;
  User.find({userName:userName},function(err, name){
    console.log("Names is ", name);
    if (name.length){
      console.log("Array not empty");
    }
    else
    {
      console.log("Empty array");
      var newUser = new User;
      newUser.userName = userName;
      newUser.save();
    }
    res.json(name);
  });
});

router.post("/settings",function(req,res){
  console.log("req body is ",req.body);
  console.log("req body settings ",req.body["settings[y]"]);
  var settings = {x:req.body["settings[x]"], y:req.body["settings[y]"], z:req.body["settings[z]"]};
  var userName = req.body.userName;
  User.find({userName: userName}, function(err, data){
    console.log("Data is ",data);
    if (data.length)
    {
      console.log("This is if statement is waiting for tonight!");
      User.findOneAndUpdate({userName: userName}, {settings: settings}, function(err,data){
        console.log("err is ", err, "data is ", data);
      });
    }
  });
});

router.post("/loadSettings", function(req, res){
  var userName = req.body.userName;
  User.find({userName: userName}, function(err, data){
    res.json(data);
  })
});

router.post("/castleInfo",function(req,res){
  var userName = req.body.userName;
  console.log("Hit up the castle route ",userName);
  User.find({userName: userName},function(err,name){
    console.log("Name is ",name[0].castle);
    res.json(name[0].castle);
  })
});

module.exports = router;
