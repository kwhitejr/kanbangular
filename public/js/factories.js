var app = angular.module('app');

app.factory('Users', [
  '$http',
  function ($http) {
    return {
      getUsers: function() {
        return $http({
          method: 'GET',
          url: '/api/users'
        });
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
    return {
      getCards: function() {
        return $http({
          method: 'GET',
          url: '/api/cards'
        });
      },

      createNewCard: function(newCardData) {
        return $http.post('/api/newCard', newCardData);
      }
    };
  }
]);


