var promise = require('bluebird');
var conn = require('./config'); // conn จะกลายเป็นคลาสที่สร้าง instance object แล้ว แล้วก็เป็นชื่อว่า database
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/mini_eq';

module.exports = new function() {

///////////////  listHeader method  ////////////////////////////////////////////
  this.listHeader = function(callbackSuccess, callbackError) {
    var $scope = {};
    $scope.getListTopic = [];

    var getListTopic = function(){
			var deferred = promise.pending();

			MongoClient.connect(url, function(err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
          deferred.reject('Unable to connect to the mongoDB server. Error:' + err);
        }else {
  				var clt_webboard_header = db.collection('webboard_header');
          var cursor = clt_webboard_header.find({});

  				cursor.each(function(err, result) {
  					if(err){
              // console.log("err = ",  err);
              deferred.reject(err);
            } else if (result != null) {
    						$scope.getListTopic.push(result);
  					} else{
              // Check length list.
  						if($scope.getListTopic.length > 0){
  							deferred.resolve("That Ok");
  						} else {
  							deferred.reject("On data");
  						}
              db.close();
  					}

  				});
        }
			});
			return deferred.promise;
		}

    getListTopic()
    .then(function() {
      console.log("from promise = ", arguments);
      callbackSuccess($scope.getListTopic);
    }).catch(function(e){
  	  console.log(e);
      callbackError(e);
  	});

  }

///////////////////  getheader method  /////////////////////////////////////////
  this.getHeader = function(header_id) {

  }

//////////////////  saveHeader method  /////////////////////////////////////////
  this.saveHeader = function(user_id, title, content, callbackok, callbackerror) {
    var db = conn.init();
    var $scope = {};
    $scope.getListTopic = [];

    var getLastid = function(){
      var deferred = promise.pending();
      MongoClient.connect(url, function(err, db) {
        if(err){
          deferred.reject("Can't connect to data base " + err);
        } else {
          var clt_webboard_header = db.collection('webboard_header');
          var cursor = clt_webboard_header.find({});

          cursor.sort({id: -1});
  				cursor.each(function(err, result) {
  					if(err){
              // console.log("err = ",  err);
              deferred.reject(err);
            } else if (result != null) {
    						$scope.getListTopic.push(result);
  					} else{
              // Check length list.
  						if($scope.getListTopic.length > 0){
                $scope.lastId = $scope.getListTopic[0].id;
                console.log("last id = ", $scope.lastId);
  							deferred.resolve("That Ok");
  						} else {
  							deferred.reject("On data");
  						}
              db.close();
  					}
  				});
        }
      });
      return deferred.promise;
    }

    var insertTopic = function(){
      var deferred = promise.pending();
      $scope.lastId += 1;
      MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
          deferred.reject('Unable to connect to the mongoDB server. Error:' + err);
        } else {
          console.log('Connection established to', url);
          // Get the documents collection
          var clt_webboard_header = db.collection('webboard_header');
          //Create some users
          var topic = {
            "id": $scope.lastId,
            "title": title,
            "content": content,
            "status": "A",
            "post_by": user_id
          };
          // Insert some users
          clt_webboard_header.insertOne(topic, function (err, result) {
            if (err) {
              console.log(err);
              deferred.reject('Can not insert data ' + err);
            } else {
              console.log('Inserted : ', result.insertedId);
              $scope.topic_id = result.insertedId;
              deferred.resolve("Insert Ok");
            }
            //Close connection
            db.close();
          });
        }
      });
      return deferred.promise;
    }
    getLastid()
    .then(insertTopic)
    .then(function() {
      console.log("Data from promise = ", arguments);
      callbackok($scope.topic_id);
    }).catch(function(e){
  	  console.log(e);
      callbackerror(e);
  	});
  }

//////////////  get reply method   /////////////////////////////////////////////
  this.getReply = function(header_id) {

  }

/////////////  save reply method   /////////////////////////////////////////////
  this.saveReply = function(user_id, header_id, content) {

  }

////////////////////////////////////////////////////////////////////////////////
} /* End module.exports here */
