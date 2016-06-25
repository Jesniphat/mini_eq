var express = require('express');
var router = express.Router();
var logins = require("../library/database-login");

/******************************************************************************/
router.get('/', function(req, res, next) {
  console.log("permission : ", permission.readToken(req));
  res.send("authen controller");
});

////////////////////////////////////////////////////////////////////////////////
router.get('/login', function(req, res, next) {
  console.log("permission : ", permission.readToken(req));
  permission.clearToken(res);
  res.render("login.html");
});

////////////////////////////////////////////////////////////////////////////////
router.post('/login', function(req, res, next) {
  // console.log("Post Login = ", req.body);
  var loginname = req.body.loginname;
  var password  = req.body.password;

  logins.checkLogin(loginname, password, function(id){
    permission.writeToken(res, id);
    res.json({id:id});
  }, function(errorMessage){
    console.log("errorMessage = ", errorMessage);
    res.json({error: errorMessage});
  });
});

////////////////////////////////////////////////////////////////////////////////
router.get('/logout', function(req, res, next) {
  console.log("Get Logout");
  res.redirect("/authen/login");
})

module.exports = router;
