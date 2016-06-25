var express = require('express');
var router = express.Router();

/* Index of message file. */
router.get('/', function(req, res, next) {
  res.render('webboard-list', { title: 'Webboard List' });
});

router.get('/testgetparam/:param1', function(req, res, next) {
  console.log("param = ", req.params.param1);
  var pr_1 = req.params.param1;
  res.send(pr_1);
});

router.get('/new', function(req, res, next) {
  console.log("Come to New");
  res.render('webboard-new', { title: 'Webboard New' });
});

router.post('/new', function(req, res, next) {
  console.log("Post new = ", req.body);
});

/* New controller in message. */
router.get('/feed', function(req, res, next) {
  res.send('feed actions (new controller).');
});

module.exports = router;



// router.get('/testCall', function(req, res, next) {
//   function JudgeYou(even, callBackForGoodMan, callBackForBadMan){
//     if(even=="Tambun"){
//       callBackForGoodMan("satu.........");
//     }else {
//       callBackForBadMan("I Law  ");
//     }
//   };
//
//   function mayGood(message){
//     console.log("Yeah!!! : " + message);
//   };
//
//   function mayBad(message){
//     console.log(message + " sus.....");
//   }
//
//   JudgeYou("Plon", mayGood, mayBad);
// });
