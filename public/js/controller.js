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
      $scope.refreshCards = function () {
        Cards.getCards().then(function (res) {
          $scope.cards = res.data;
        });
      };
      $scope.cards = [];
      $scope.refreshCards();
    }
  ])
  // a directive creates a custom element or a custom attribute
  .directive('cardDirective', function () {
    return {
      restrict: 'E', // default is E, but could also be an attribute, etc
      scope: {
        data: "=card", // the right side is the directive-element attribute
        refreshCards: "=" // is equal to the things call 'refreshCards'  --> DONT FORGET NAME-SPACING IN YOUR HTML
      },
      controller: [
        '$scope',
        '$http',
        function ($scope, $http) {
          $scope.createdByName = getUserName($scope.data.creator_id, $scope.$parent.users);
          $scope.assignedToName = getUserName($scope.data.assignee_id, $scope.$parent.users);
          $scope.update = function ($event) {
            $event.preventDefault();
            var updatedCard = {
              id: $scope.data.id,
              newStatus: $event.target.newStatus.value
            };
            // console.log($event.target);
            // console.log($event.target.newStatus.value);
            // console.log($scope.data);
            return $http.post('/api/update', updatedCard)
              .then(function() {
                $scope.refreshCards();
              });
          };

          $scope.delete = function () {
            console.log($scope.data);
            return $http.post('/api/delete', $scope.data)
              .then(function () {
                $scope.refreshCards();
              });
          };

          function getUserName (userId, users) {
            console.log("calling all usernames");
            // debugger;
            var result = users.filter(function (user) {
              return user.id === userId;
            });
            if (result.length > 0) {
              return result[0].userName;
            } else {
              return '';
            }
          }
        }
      ],
      templateUrl: 'templates/card.html'

      //insert Drag-and-Drop code here
    };
  });