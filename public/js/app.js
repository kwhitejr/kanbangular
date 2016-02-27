angular.module('app', ['ngRoute', 'ngAnimate']);

var app = angular.module('app');

app
  .config(function ($routeProvider) {
    $routeProvider
      .when('/404', {
        templateUrl: '/templates/404.html'
      })
      .otherwise('/404');

  })
  .run([
    '$rootScope',
    'APP_VERSION',
    function ($rootScope, APP_VERSION) {
      // Start Application
      console.log("Pyuuy pyuu");
      $rootScope.version = APP_VERSION;
    }
  ]);