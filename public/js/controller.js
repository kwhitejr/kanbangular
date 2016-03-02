var app = angular.module('app');

app
  .controller('MyController', [
    '$scope',
    'Users',
    'Cards',
    function ($scope, Users, Cards) {
      $scope.users = [];
      Users.getUsers().then(function (res) {
        $scope.users = res.data;
      });
      $scope.cards = [];
      Cards.getCards().then(function (res) {
        $scope.cards = res.data;
      });
      $scope.dropped = function(dragElement, dropElement) {

      };
    }
  ])
  .directive();