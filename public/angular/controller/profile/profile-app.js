var miniSocialProfile = angular.module("MiniSocial",['db']);
  miniSocialProfile.controller("ProfileController", function($scope,dbSvc){
    $scope.loginname = "";
    $scope.password = "";
    $scope.displayname = "Test";
});
