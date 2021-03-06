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
        .fetchUsers()
        .then(function (fetchedUsers) {
          $scope.users = Users.getUsers();
        });

      $scope.createCard = function ($event) {
        $event.preventDefault();
        newCard = {
          title: $event.target.title.value,
          details: $event.target.details.value,
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
          username: $event.target.username.value,
          password: $event.target.password.value
        };
        // use existing factory to send post req
        return Users
          .createNewUser(newUser)
          .then(function () {
            return Users.fetchUsers()
          .then(function (fetchedUsers) {
            $scope.users = fetchedUsers.data;
          })
          .catch(function (err) {
            console.log(err);
          });
        });
      };

      $scope.refreshCards = function () {
        Cards.fetchCards()
          .then(function () {
            var allCards = Cards.getCards();
            $scope.cards = allCards;
          });
      };

      $scope
        .$on('status-bag.drop', function (err, el, target, source, sibling) {
          console.log("and now dropping...");
          var id = el[0].id;
          var status = target[0].classList[0];
          $scope.update(id, status);
        });

      $scope.update = function (id, status) {
        var updatedCard = {
          id: id,
          newStatus: status
        };
        return $http.post('/api/update', updatedCard)
          .then(function() {
            $scope.refreshCards();
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
      transclude: true,
      controller: [
        '$scope',
        '$http',
        function ($scope, $http) {
          $scope.createdByName = getUserName($scope.data.creator_id, $scope.$parent.users);
          $scope.assignedToName = getUserName($scope.data.assignee_id, $scope.$parent.users);

          $scope.startEdit = function () {
            return $http.get('/api/editCard', $scope.data);
          };

          function getUserName (userId, users) {
            var result = users.filter(function (user) {
              return user.id === userId;
            });
            if (result.length > 0) {
              return result[0].username;
            } else {
              return '';
            }
          }
        }
      ],
      templateUrl: 'dashboard/templates/card.html'

      //insert Drag-and-Drop code here
    };
  });

app.controller('editCardController', [
  '$scope',
  '$routeParams',
  '$http',
  '$location',
  'Cards',
  'Users',
  'Priorities',
  'Statuses',
  function ($scope, $routeParams, $http, $location, Cards, Users, Priorities, Statuses) {

    $scope.temp = Cards.getOneCard(parseInt($routeParams.id));
    $scope.card = $scope.temp[0];

    if (! $scope.card) {
      return Cards.fetchCards()
        .then(function () {
          $scope.temp = Cards.getOneCard(parseInt($routeParams.id));
          $scope.card = $scope.temp[0];
        })
        .then(Users.fetchUsers()
          .then(function () {
            $scope.users = Users.getUsers();
          })
        )
        .then(function () {
          $scope.priorities = Priorities.getPriorities();
          $scope.statuses = Statuses.getStatuses();
        });
    }

    $scope.users = Users.getUsers();
    $scope.priorities = Priorities.getPriorities();
    $scope.statuses = Statuses.getStatuses();

    $scope.createdByName = getUserName($scope.card.creator_id, $scope.users);
    $scope.assignedToName = getUserName($scope.card.assignee_id, $scope.users);

    $scope.update = function ($event) {
      $event.preventDefault();
      var updatedCard = {
        id: $scope.card.id,
        title: $event.target.title.value,
        details: $event.target.details.value,
        creator_id: parseInt($event.target.creator_id.value),
        assignee_id: parseInt($event.target.assignee_id.value),
        priority: $event.target.priority.value,
        status: $event.target.status.value
      };

      return $http.post('/api/update/' + $scope.card.id, updatedCard)
        .success(function (result) {
          $location.path('/');
        });
    };

    $scope.delete = function () {
      return $http.post('/api/delete/' + $scope.card.id)
        .success(function (result) {
          $location.path('/');
        });
    };

    function getUserName (userId, users) {
      var result = users.filter(function (user) {
        return user.id === userId;
      });
      if (result.length > 0) {
        return result[0].username;
      } else {
        return '';
      }
    }
  }
]);

app.controller('navigationController', [
  '$scope',
  function ($scope) {
    $scope.isUserLoggedIn = true;
  }
]);