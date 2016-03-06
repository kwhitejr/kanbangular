var app = angular.module('app');

app
  .controller('MyController', [
    '$scope',
    'Users',
    'Cards',
    '$http',
    function ($scope, Users, Cards, $http) {
      $scope.users = [];
      $scope.cards = [];

      Users
        .getUsers()
        .then(function (fetchedUsers) {
          $scope.users = fetchedUsers.data;
        });

      $scope.createCard = function ($event) {
        $event.preventDefault();
        newCard = {
          title: $event.target.title.value,
          status: "queue",
          priority: $event.target.priority.value,
          creator_id: parseInt($event.target.creator_id.value),
          assignee_id: parseInt($event.target.assignee_id.value)
        };

        return Cards
          .createNewCard(newCard)
          .then(function () {
            return $scope.refreshCards();
        })
          .catch(function (err) {
            console.log(err);
          });
      };

      $scope.createUser = function ($event) {
        $event.preventDefault();
        newUser = {
          firstName: $event.target.firstName.value,
          lastName: $event.target.lastName.value,
          userName: $event.target.userName.value
        };
        // use existing factory to send post req
        return Users
          .createNewUser(newUser)
          .then(function () {
            return Users.getUsers()
          .then(function (fetchedUsers) {
            $scope.users = fetchedUsers.data;
          })
          .catch(function (err) {
            console.log(err);
          });
        });
      };

      $scope.refreshCards = function () {
        return Cards
          .fetchCards()
          .then(function (fetchedCards) {
            $scope.cards = fetchedCards.data;
        });
      };

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
        'CardService',
        function ($scope, $http) {
          $scope.createdByName = getUserName($scope.data.creator_id, $scope.$parent.users);
          $scope.assignedToName = getUserName($scope.data.assignee_id, $scope.$parent.users);

          $scope.update = function ($event, status) {
            $event.preventDefault();
            var updatedCard = {
              id: $scope.data.id,
              newStatus: status
            };
            return $http.post('/api/update', updatedCard)
              .then(function() {
                $scope.refreshCards();
              });
          };

          $scope.delete = function () {
            return $http.post('/api/delete', $scope.data)
              .then(function () {
                $scope.refreshCards();
              });
          };

          $scope.startEdit = function () {
            return $http.get('/api/editCard', $scope.data);
          };

          function getUserName (userId, users) {
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
