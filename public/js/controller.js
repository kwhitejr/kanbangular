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

    }
  ])
  // a directive creates a custom element or a custom attribute
  .directive('cardDirective', function () {
    return {
      restrict: 'E', // default is E, but could also be an attribute, etc
      scope: {
        data: "=card" // the right side is the directive-element attribute
      },
      controller: [
        '$scope',
        '$http',
        function ($scope, $http) {
          $scope.update = function () {
            console.log($scope.data);
            return $http.post('/api/update', $scope.data);
        };
      }],
      templateUrl: 'templates/card.html'

      //insert Drag-and-Drop code here
    };
  });