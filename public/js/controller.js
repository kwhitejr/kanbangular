var app = angular.module('app');

app.controller('MyController', [
  '$scope',
  'Users',
  function ($scope, Users) {
    $scope.myFirstName = 'Ser Kevin of Haus Whyte';
    $scope.users = [];
    Users.getUsers().then(function (res) {
      $scope.users = res.data;
    });
  }
]);