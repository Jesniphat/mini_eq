var promise     = require('bluebird');
var conn        = require('./config'); // conn จะกลายเป็นคลาสที่สร้าง instance object แล้ว แล้วก็เป็นชื่อว่า database
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/mini_eq';

module.exports = new function() {

/////////////////////////////   Create Login Method   /////////////////////////////////////////
  this.createLogin = function(loginname, password, displayname, callbackok, callbackerror) {
    // var db = conn.init(); //เรียก method init จาก class database
    var $scope = {};
    $scope.getListMember = [];

    var checkLoginDuplicate = function(){
      var deferred = promise.pending();

      MongoClient.connect(url, function(err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
          deferred.reject('Unable to connect to the mongoDB server. Error:' + err);
        }else {
  				var clt_member = db.collection('member');
          var cursor = clt_member.find({"login_name":loginname, "password":password});

  				cursor.each(function(err, result) {
  					if(err){
              deferred.reject(err);
            } else if (result != null) {
    						$scope.getListMember.push(result);
  					} else{
              // Check length list.
  						if($scope.getListMember.length > 0){
  							deferred.reject("Duplicate Data Can't use this Login");
  						} else {
  							deferred.resolve("Can use this Login name.");
  						}
              db.close();
  					}

  				});
        }
			});
      return deferred.promise;
    }

    var insertLogin = function(){
      console.log("Arguments Duplicate = ",arguments);
      var deferred = promise.pending();

      MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
          deferred.reject('Unable to connect to the mongoDB server. Error:' + err);
        } else {
          console.log('Connection established to', url);
          // Get the documents collection
          var clt_member = db.collection('member');
          //Create some users
          var member = {
            "login_name": loginname,
            "password": password,
            "display_name": displayname,
            "status": "A"
          };
          // Insert some users
          clt_member.insertOne(member, function (err, result) {
            if (err) {
              console.log(err);
              deferred.reject('Error create Login ' + err);
            } else {
              console.log('Inserted : ', result.insertedId);
              $scope.login_id = result.insertedId;
              deferred.resolve(result.insertedId);
            }
            //Close connection
            db.close();
          });
        }
      });
      return deferred.promise;
    }

    checkLoginDuplicate()
    .then(insertLogin)
    .then(function() {
      console.log("from promise = ", arguments);
      callbackok($scope.login_id);
    }).catch(function(e){
  	  console.log(e);
      callbackerror(e);
  	});
  }

/////////////// checl login method  //////////////////////////////////////////////////
  this.checkLogin = function(login, pass, callbackok, callbackerror) {
    var $scope = {};
    $scope.getLogin = [];

    var checkLoginPass = function(){
      var deferred = promise.pending();

      MongoClient.connect(url, function(err, db) {
				assert.equal(null, err);
				var cursor = db.collection('member').find({"login_name":login,"password":pass});
				cursor.each(function(err, doc) {
					assert.equal(err, null);
					console.log("err = ", err);
					if (doc != null) {
						$scope.getLogin.push(doc);
					} else{
						if($scope.getLogin.length > 0){
              console.log("getLogin = ", $scope.getLogin);
							deferred.resolve("Login Ok");
						} else {
							deferred.reject("Invalid login");
						}
					}
				});
			});
      return deferred.promise;
    }


    checkLoginPass()
    .then(function() {
      console.log("checkLogin from promise = ", arguments);
      callbackok($scope.getLogin[0]._id);
    }).catch(function(e){
  	  console.log(e);
      callbackerror(e);
  	});
  }


////////////////////////////////////////////////////////////////////////////////
} /* End module.exports here */
