angular.module('db', [])
.service('dbSvc', ['$rootScope', '$window', '$q', '$filter', '$http',
  function($rootScope, $window, $q, $filter, $http){
    var request = function(api_url,action, param) {
      var deferred = $q.defer();
      var url = api_url;
      $http.post(url + '/' + action, param).then(function(response) {
        deferred.resolve(response.data);
      }, function(error) {
        console.log("error = ", error);
        deferred.reject(false);
      });
      return deferred.promise;
    }
    this.request = request;
}]);
