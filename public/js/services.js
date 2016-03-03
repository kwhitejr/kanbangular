var app = angular.module('app');

app.service('CardInfo', CardInfo);

function CardInfo () {

  this.getInfo = function (id) {
    return $http({
      method: 'POST',
      url: '/api/info'
    });
  };
}

