var app = angular.module('app');

app.controller('MyController', [
  '$scope',
  function ($scope) {
    $scope.myFirstName = 'Ser Kevin of Haus Whyte';
  }
]);