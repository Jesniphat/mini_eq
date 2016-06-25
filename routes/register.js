var express = require('express');
var router = express.Router();
var logins = require("../library/database-login");

router.get('/', function(req, res, next) {
  res.render("register.html");
});

router.post('/save', function(req, res, next) {
  console.log("server/save",req.body);
  var loginname = req.body.loginname;
  var password = req.body.password;
  var displayname = req.body.displayname;

  logins.createLogin(loginname, password, displayname, function(id){
    console.log("login id is = ", id);
    res.json({id: id});
  }, function(errorMessage){
    console.log("Error = ", errorMessage);
    res.json({error: errorMessage});
  });
});

module.exports = router;
