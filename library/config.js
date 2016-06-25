module.exports = new function() {
  var db = null;
  this.init = function(){
    var mysql = require("mysql");
    db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "p@ssw0rd",
      database: "mini_eq"
    });
    db.connect(function(err){
      if(err) {
        console.log("Error Connect db");
        console.log(err);
      }else {
        console.log("Connect DB Success");
      }
    });
    return db;
  }
}
