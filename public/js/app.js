angular.module('app', ['ngRoute', 'ngAnimate']);

var app = angular.module('app');

app
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/tasks.html',
        controller: 'MyController'
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