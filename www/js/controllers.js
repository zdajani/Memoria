angular.module('starter.controllers', ['ngCordova', 'ngDraggable', 'firebase'])

.controller('KnomiCtrl', function($scope, $cordovaLocalNotification, foodFactory, PointsFactory, PowerFactory, $firebaseArray, ModalService) {
  $scope.foods = [foodFactory.randomFood()];
  $scope.visibilityControl = false;

  PointsFactory.$loaded().then(function() {
    $scope.points = PointsFactory.$value;
  });

  PowerFactory.$loaded().then(function() {
    $scope.health = PowerFactory.$value;
  });

  $scope.exampleModal = function() {
    ModalService
      .init('my-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/Points');

  $scope.feed = function() {
    $scope.health += 1;
    $scope.points -= 5;
    var newData = {knomi_power: $scope.health, user_points: $scope.points};
    console.log(newData);
    itemRef.update(newData);
    if ($scope.points < 1) {
      $scope.openModal();
    }
  };

  $scope.notify = function() {
    itemRef.update({knomi_power: 0, user_points: 10});
    itemRef.on("value", function(snapshot) {
      allData = (snapshot.val());
      console.log(allData.user_points);
      $scope.points = allData.user_points;
      $scope.health = allData.knomi_power;
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

  $scope.onDropComplete = function(){
    $scope.visibilityControl = !$scope.visibilityControl;
    setTimeout(function ()
    {
      $scope.$apply(function()
      {
        $scope.visibilityControl = !$scope.visibilityControl;
      });
    }, 10000);
  };

})

.controller('QsCtrl', function($scope, QuestionFactory) {

  $scope.items = QuestionFactory;

  $scope.addQuestion = function(){
    $scope.items.$add({
    question: $scope.items.question,
    answer: $scope.items.answer,
    date: Date.now(),
    interval: 5 * 1000
    });
  };

})

.controller('questionAnswerCtrl', function($scope, $stateParams, QuestionFactory, ModalService, timerFactory) {
  var list = QuestionFactory;
  var studyItem = list.$getRecord($stateParams.studyItemId);
    
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
    } 
    else {
      ModalService
        .init('modals/wrongAnswer-modal.html', $scope)
        .then(function(modal) {
          modal.show();
        });
      timerFactory.minusTime($stateParams.studyItemId);
      reducePower();
    }
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



.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
