var express = require("express");
var router = express.Router();
var webboard = require("../library/database-webboard");

router.use(function(req, res, next){
  console.log("perrmission : ", permission.readToken(req));
  if(permission.isLogin(req)){
    next();
  }else {
    res.json({
      status:false,
      error: "Access Denied"
    });
  }
});

/* Index of message file. */
// router.get("/", function(req, res, next) {
//   console.log("perrmission : ", permission.readToken(req));
//   res.send("Message controller");
// });

////////////////////////////////////////////////////////////////////////////////
router.post("/feed", function(req, res, next) {
  console.log("perrmission : ", permission.readToken(req));
  console.log("cookie = ", req.cookies);
  webboard.listHeader(function(data){
    res.json({
      status:true,
      data:data
    });
  }, function(errorMessage){
    console.log(errorMessage);
    res.json({
      status:false,
      error:errorMessage
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
router.get("/topic/:id", function(req, res, next) {
  console.log("topic id = ", req.params.id);
  var id = req.params.id;
  res.send("ID : " + id);
});
////////////////////////////////////////////////////////////////////////////////
router.get("/reply/:id", function(req, res, next) {
  console.log("reply id = ", req.params.id);
  var id = req.params.id;
  res.send("ID : " + id);
});
////////////////////////////////////////////////////////////////////////////////
router.post("/save", function(req, res, next) {
  webboard.saveHeader(permission.getID(req), req.body.title, req.body.content, function(id){
    res.json({
      status:true,
      id:id
    });
  }, function(errorMessage){
    console.log("error m : ", errorMessage);
    res.json({
      status:false,
      error:errorMessage
    });
  });
});
////////////////////////////////////////////////////////////////////////////////
router.post("/reply", function(req, res, next) {
  console.log("reply = ", req.query);
  res.send("Save Success");
});

module.exports = router;
