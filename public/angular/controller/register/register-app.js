var miniSocialRegister = angular.module("MiniSocial",['db']);
    miniSocialRegister.controller("RegisterContraller", function($scope,dbSvc){
      $scope.DisplayName = "";
      $scope.LoginName = "";
      $scope.Password ="";
      $scope.ConfirmPassword = "";

      $scope.register = function(){
        if($scope.LoginName.trim().length==0){
          alert("ใส่ LoginName ด้วย");
          return;
        } if ($scope.DisplayName.trim().length==0){
          alert("ใส่ DisplayName ด้วย");
          return;
        } if($scope.Password != $scope.ConfirmPassword){
          alert("Password และ ConfirmPassword ต้องตรงกัน");
          return;
        }

        var param = {
          loginname: $scope.LoginName,
          password: $scope.Password,
          displayname: $scope.DisplayName
        }
        dbSvc.request("/register","save", param).then(function(result) {
          console.log(result);
          if(result.id){
            // console.log("result.id = ", result.id);
            location.href = "/authen/login";
          }else {
            console.log(result.error);
            alert(result.error);
          }
        });
      }
    });
