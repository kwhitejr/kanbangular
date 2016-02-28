var app = angular.module('app');

app.controller('MyController', [
  '$scope',
  'Users',
  'Cards',
  function ($scope, Users, Cards) {
    $scope.myFirstName = 'Ser Kevin of Haus Whyte';
    $scope.users = [];
    Users.getUsers().then(function (res) {
      $scope.users = res.data;
    });
    $scope.cards = [];
    Cards.getCards().then(function (res) {
      $scope.cards = res.data;
    });
  }
]);