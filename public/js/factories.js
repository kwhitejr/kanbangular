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
      }
    };
  }
]);