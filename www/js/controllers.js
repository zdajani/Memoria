angular.module('starter.controllers', ['ngCordova', 'ngDraggable', 'firebase'])

.controller('KnomiCtrl', function($scope, $cordovaLocalNotification, foodFactory, PointsFactory, PowerFactory, $firebaseArray, ModalService) {
  $scope.foods = foodFactory.food();

  var points = PointsFactory;
  $scope.points = points;
  var power = PowerFactory;
  $scope.power = power;

  $scope.vendorModal = function() {
    ModalService
      .init('modals/vendor-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.foodModal = function(points) {
    if (points < 5) {
      ModalService
        .init('modals/food-modal.html', $scope)
        .then(function(modal) {
          modal.show();
        });
    } else {
      foodFactory.addFood();
      reducePoints();
    }
  };

  $scope.onDropComplete = function(){
    foodFactory.removeFood();
    addPower();
  };

  var reducePoints = function() {
    var pointsRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
    pointsRef.transaction(function(current_value) {
      return (current_value -= 5);
    });
  };
  var addPower = function() {
    var powerRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
    powerRef.transaction(function(current_value) {
      return (current_value += 1);
    });
  };



  $scope.notify = function() {
    var pointsRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
    pointsRef.transaction(function(current_value) {
      return (current_value = 10);
    });
    var powerRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
    powerRef.transaction(function(current_value) {
      return (current_value = 0);
    });
    var now = new Date().getTime();
    var timeInSeconds = 7;
    _X_sec_from_now = new Date(now + timeInSeconds *1000);
    $cordovaLocalNotification.schedule({
      id: 1,
      title: "Title",
      text: "This is a notification",
      at: _X_sec_from_now,
    });
  };

})

.controller('QsCtrl', function($scope, QuestionFactory, $cordovaLocalNotification, DataFormatting) {

  $scope.items = QuestionFactory;

  $scope.addQuestion = function(){
    $scope.items.$add({
    question: DataFormatting.addQuestionMark(DataFormatting.capitalizeFirstLetter($scope.items.question)),
    answer: $scope.items.answer,
    date: Date.now(),
    interval: 5
    });
  };
  $scope.addQuestionNotify = function () {
    var now = new Date().getTime();
    var scheduledTime = new Date(now + (5 * 1000));
    $cordovaLocalNotification.schedule({
      id: 1,
      title: "It's time to answer a question!",
      text: $scope.items.question,
      at: scheduledTime
    });
  };


})

.controller('questionAnswerCtrl', function($scope, $stateParams, QuestionFactory, ModalService, timerFactory, PointsFactory, $cordovaLocalNotification) {
  var list = QuestionFactory;
  var studyItem = list.$getRecord($stateParams.studyItemId);
  var points = PointsFactory;
  $scope.points = points;

  $scope.studyItem = studyItem;

  $scope.validateAnswer = function(answer) {
    if (answer === studyItem.answer) {
      ModalService
        .init('modals/correctAnswer-modal.html', $scope)
        .then(function(modal) {
          modal.show();
      });
      timerFactory.addTime($stateParams.studyItemId);
      addPoints();
        console.log(timerFactory.addNotificationTime(studyItem.interval));
      questionNotify(timerFactory.addNotificationTime(studyItem.interval));
    }
    else {
      ModalService
        .init('modals/wrongAnswer-modal.html', $scope)
        .then(function(modal) {
          modal.show();
        });
      timerFactory.minusTime($stateParams.studyItemId);
      reducePower();
      questionNotify(timerFactory.minusNotificationTime(studyItem.interval));
    }
  };

  var questionNotify = function (time) {
    var now = new Date().getTime();
    var scheduledTime = new Date(now + (time * 1000));
    $cordovaLocalNotification.schedule({
      id: studyItem.date,
      title: "It's time to answer a question!",
      text: studyItem.question,
      at: scheduledTime
    });
  };

  var addPoints = function() {
    var pointsRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
    pointsRef.transaction(function(current_value) {
      return (current_value += 5);
    });
  };
  var reducePower = function() {
    var powerRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
    powerRef.transaction(function(current_value) {
      return (current_value -= 1);
    });
  };
})

.controller('TabCtrl', function($scope) {

  var qRef =  new Firebase('https://studymemoria.firebaseio.com/MyStudies');

  qRef.on("value", function(snapshot) {
    var availableCount = 0;
    snapshot.forEach(function(question) {
      if (question.child('isAvailable').val()) {
        availableCount += 1
      }
    })
    $scope.availableQuestions = availableCount;
  });

})

.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
