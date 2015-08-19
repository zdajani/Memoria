angular.module('starter.controllers', ['ngCordova', 'ngDraggable', 'firebase'])

.controller('KnomiCtrl', function($scope, $cordovaLocalNotification, foodFactory, PointsFactory, PowerFactory, $firebaseArray, ModalService, $firebase) {
  $scope.foods = foodFactory.food();

  var points = PointsFactory;
  $scope.points = points;
  var power = PowerFactory;
  $scope.power = power;

  $scope.feed = function() {
    foodFactory.addFood();
    reducePoints();
  }

  $scope.vendorModal = function() {
    ModalService
      .init('modals/vendor-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.shopModal = function() {
    ModalService
      .init('modals/shop-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.onDropComplete = function(){
    foodFactory.removeFood();
    addPower();
  };

  var reducePoints = function() {
    var pointsRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
    pointsRef.transaction(function(current_value) {
      return (current_value -= 1);
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

.controller('QsCtrl', function($scope, QuestionFactory, $cordovaLocalNotification, DataFormatting, $firebaseArray, $timeout) {

  $scope.items = QuestionFactory;


  $scope.addQuestion = function(){
    $scope.items.$add({
    question: DataFormatting.addQuestionMark(DataFormatting.capitalizeFirstLetter($scope.items.question)),
    answer: $scope.items.answer.replace(/^\s+|\s+$/g,''),
    date: Date.now(),
    interval: 5,
    isAvailable: false
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


  var qRef =  new Firebase('https://studymemoria.firebaseio.com/MyStudies');

  qRef.on("child_changed", function(Childsnapshot) {
    var childRef = $firebaseArray(new Firebase('https://studymemoria.firebaseio.com/MyStudies/' + Childsnapshot.key()));
    childRef.$loaded().then(function() {
      $timeout(function() { changeAvailability(Childsnapshot.key()); }, Childsnapshot.val().interval * 1000);
    });

  });

  var changeAvailability = function(id) {
    var availableRef = new Firebase('https://studymemoria.firebaseio.com/MyStudies/'+ id + '/isAvailable');
    availableRef.transaction(function(current_value) {
      return (current_value = true);
    });
  };

  $scope.questionLink = function(item) {
    if(item.isAvailable) {
      return "#/tab/questions/" + item.$id;
    } else {
      return "#";
    }
  };

})

.controller('questionAnswerCtrl', function($scope, $stateParams, QuestionFactory, ModalService, timerFactory, PointsFactory, $cordovaLocalNotification) {
  var list = QuestionFactory;
  var studyItem = list.$getRecord($stateParams.studyItemId);
  var points = PointsFactory;
  $scope.points = points;

  $scope.studyItem = studyItem;

  $scope.validateAnswer = function(answer) {
    answer = answer.replace(/^\s+|\s+$/g,'');
    if (answer.toLowerCase() === studyItem.answer.toLowerCase()) {
      ModalService
        .init('modals/correctAnswer-modal.html', $scope)
        .then(function(modal) {
          modal.show();
      });
      timerFactory.addTime($stateParams.studyItemId);
      addPoints();
      availability($stateParams.studyItemId);
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
      availability($stateParams.studyItemId);
      questionNotify(timerFactory.minusNotificationTime(studyItem.interval));
    }
  };

  var availability = function(id) {
    var availableRef = new Firebase('https://studymemoria.firebaseio.com/MyStudies/'+ id +'/isAvailable');
    availableRef.transaction(function(current_value) {

      return (current_value = false);

    });
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
      if(current_value !== 0) {
        return (current_value -= 1);
      }
    });
  };
})

.controller('TabCtrl', function($scope) {

  var qRef =  new Firebase('https://studymemoria.firebaseio.com/MyStudies');

  qRef.on("value", function(snapshot) {
    var availableCount = 0;
    snapshot.forEach(function(question) {
      if (question.child('isAvailable').val()) {
        availableCount += 1;
      }
    });
    $scope.availableQuestions = availableCount;
  });

})

.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
