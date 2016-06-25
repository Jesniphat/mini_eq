var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("perrmission : ", permission.readToken(req));
  if(permission.isLogin(req)){
    res.render('webboard.html', { title: 'Express' });
  }else {
    res.redirect("/authen/login");
  }
});

module.exports = router;
