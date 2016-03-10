var app = angular.module('app');

app.factory('Users', [
  '$http',
  function ($http) {
    var usersArray = [];

    return {
      fetchUsers: function() {
        return $http.get('/api/users')
          .then(function (results) {
            usersArray = results.data;
        });
      },

      getUsers: function() {
        return usersArray;
      },

      createNewUser: function(newUserData) {
        // can do validations and etc here rather than on the server
        return $http.post('/api/newUser', newUserData);
      }
    };
  }
]);

app.factory('Cards', [
  '$http',
  function ($http) {
    var cardsArray = [];

    return {
      // Fetch all cards in the database via postgres query
      fetchCards: function() {
        return $http.get('/api/cards')
          .then(function (results) {
            cardsArray = results.data;
          });
      },

      // Get all cards currently in angular memory
      getCards: function() {
        return cardsArray;
      },

      // Get a single card currently in angular memory
      getOneCard: function(cardId) {
        return cardsArray.filter(function (card) {
          return card.id === cardId;
        });
      },

      createNewCard: function(newCardData) {
        return $http.post('/api/newCard', newCardData);
      }
    };
  }
]);

app.factory('Priorities', [
  function () {
    var prioritiesArray = [
      "low",
      "medium",
      "high",
      "omega"
    ];

    return {
      getPriorities: function() {
        return prioritiesArray;
      }
    };
  }
]);

app.factory('Statuses', [
  function () {
    var statusesArray = [
      "queue",
      "in-progress",
      "done"
    ];

    return {
      getStatuses: function() {
        return statusesArray;
      }
    };
  }
]);