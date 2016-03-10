angular.module('app', ['ngRoute', 'ngAnimate', angularDragula(angular)]);

var app = angular.module('app');

app
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'MyController',
        templateUrl: '/templates/tasks.html'
      })
      .when('/editCard/:id', {
        controller: 'editCardController',
        templateUrl: '/templates/editCard.html'
      })
      .when('/404', {
        templateUrl: '/templates/404.html'
      })
      .otherwise('/404');

  })
  .run([
    '$rootScope',
    // 'APP_VERSION',
    function ($rootScope) {
      // Start Application
      // $rootScope.version = APP_VERSION;
    }
  ]);