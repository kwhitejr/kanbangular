var app = angular.module('app');

app.service('CardService', CardService);

function CardService () {
  var cards = [];

  this.addCard = function (title, priority, createdBy, assignedTo) {
    var newCard = {
      title: title,
      priority: priority,
      createdBy: createdBy,
      assignedTo: assignedTo
    };
  };
}

/*
Title (String)
Priority (low, Medium, High, Blocker)
Created By (Full Name)
Assigned To (Full Name)
*/