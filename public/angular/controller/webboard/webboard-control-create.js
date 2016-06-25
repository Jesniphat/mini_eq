miniSocial.controller("webboardCreateController", function($scope,$location,dbSvc){
  console.log("webboardCreateController");

  $scope.Title = "";
  $scope.Content = "";

  $scope.saveTopic = function(){
    console.log("topic = ", $scope.Title, "  Content = ", $scope.Content);
    if($scope.Title == "" || $scope.Content == ""){
      alert("ใส่ข้อมูลให้ครบนะ");
      return;
    }

    var param = {
      title: $scope.Title,
      content: $scope.Content
    }
    console.log("param = ", param);
    dbSvc.request("/message","save", param).then(function(result) {
      console.log(result);
      if(result.status === true){
        console.log("result : ", result.id);
        $location.path("/webboardTopic");
      } else {
        alert(result.error);
      }
    });
  }

});
