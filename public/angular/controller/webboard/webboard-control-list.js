miniSocial.controller("webboardListController", function($scope,dbSvc){
  $scope.title="Hello Wabboard."
  $scope.topic=[];
  $scope.listTopic = function(){
    dbSvc.request("/message","feed", {}).then(function(result) {
      console.log(result);
      if(result.status === true){
        $scope.topic = result.data;
      } else {
        alert(result.error);
      }

    });
  };

});
