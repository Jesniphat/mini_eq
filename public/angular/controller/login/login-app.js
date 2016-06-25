var miniSocialLogin = angular.module("MiniSocial",['db']);
  miniSocialLogin.controller("LoginController", function($scope,dbSvc){
    $scope.LoginName = "";
    $scope.Password = "";
    $scope.checkLogin = function(){
      if($scope.LoginName.trim().length==0){
        alert("ใส่ LoginName ด้วย");
        return;
      } if ($scope.Password.trim().length < 1){
        console.log($scope.Password);
        alert("ใส่ Password ด้วย");
        return;
      }

      var param = {
        loginname: $scope.LoginName,
        password: $scope.Password
      }
      console.log("param ", param);
      dbSvc.request("/authen","login", param).then(function(result) {
        console.log(result);
        if(result.id){
          // console.log("result.id = ", result.id);
          location.href = "/";
        }else {
          console.log(result.error);
          alert(result.error);
        }
      });
    }
});
