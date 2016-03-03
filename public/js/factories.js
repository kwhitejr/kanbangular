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
      },

      // update: function() {
      //   return $http.post('/api/update', data); // 'data' should be all the info linked to the specific card

      //     // .then(function (res) {
      //     //   res.render(); // re-render the cards
      //     // });
      // }
    };
  }
]);
