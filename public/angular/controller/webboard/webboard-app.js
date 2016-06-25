var miniSocial = angular.module("MiniSocial",['ui.router','db']);

miniSocial.filter('startFrom', function() {
  return function(input, start) {
    //console.log(input, start);
    start = +start; //parse to int
    return input.slice(start);
  }
});

miniSocial.config(function($stateProvider, $urlRouterProvider){
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/webboardList") // ค่าเริ่มต้น
  $stateProvider
    .state("webboardList", {
      url: "^/webboardList",
      templateUrl: "/angular/view/webboard/webboard-list.html",
      controller: "webboardListController",
    })
    .state("create", {
      url: "^/webboardCreate",
      templateUrl: "/angular/view/webboard/webboard-create.html",
      controller: "webboardCreateController",
    })
    .state("topic", {
      url: "^/webboardTopic",
      templateUrl: "/angular/view/webboard/webboard-topic.html",
      controller: "webboardTopicController",
    });
});
