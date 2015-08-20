angular.module('starter.controllers', ['ngCordova', 'ngDraggable', 'firebase'])

.controller('KnomiCtrl', function($scope, $cordovaLocalNotification, foodFactory, PointsFactory, PowerFactory, $firebaseArray, ModalService, $firebase) {
  $scope.foods = foodFactory.food();

  var points = PointsFactory;
  $scope.points = points;
  var power = PowerFactory;
  $scope.power = power;

  $scope.feed = function(id) {
    foodFactory.addFood(id);
    reducePoints(id);
  };

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

  $scope.evolution1Modal = function() {
    ModalService
      .init('modals/evolution1-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.evolution2Modal = function() {
    ModalService
      .init('modals/evolution2-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.evolution3Modal = function() {
    ModalService
      .init('modals/evolution3-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.onDropComplete = function(){
    foodFactory.removeFood();
    addPower();
  };

  $scope.brownRug = function() {
    $scope.knomiBrownRug = true;
    reducePoints(10);
  };

  $scope.leopardRug = function() {
    $scope.knomiLeopardRug = true;
    reducePoints(10);
  };

  $scope.starfishRug = function() {
    $scope.knomiStarfishRug = true;
    reducePoints(10);
  };

  var reducePoints = function(points) {
    var pointsRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
    pointsRef.transaction(function(current_value) {
      return (current_value -= points);
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

.controller('QsCtrl', function($scope, QuestionFactory, $cordovaLocalNotification, DataFormatting, $firebaseArray, $timeout, $ionicPopup, ModalService) {

  $scope.items = QuestionFactory;

  $scope.questionModal = function() {
    ModalService
      .init('modals/question-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.addQuestion = function(){
    $scope.items.$add({
      question: $scope.items.question,
      answer: $scope.items.answer.replace(/^\s+|\s+$/g,''),
      date: Date.now(),
      interval: 5,
      isAvailable: false
    }).then(function(ref) {
      var available = ref.child('isAvailable');
      $timeout(function() { available.ref().set(true); }, 5 * 1000);
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

  $scope.questionLink = function(item) {
    if(item.isAvailable) {
      return "#/tab/questions/" + item.$id;
    } else {
      return '#';
    }
  };
  
  var qRef =  new Firebase('https://studymemoria.firebaseio.com/MyStudies');

  qRef.on("child_changed", function(Qsnapshot) {
    if (Qsnapshot.val().isAvailable === false) {
      Qsnapshot.child('isAvailable').ref().on("value", function(availableSnapshot){
        $timeout(function(){ setTrue(Qsnapshot); }, Qsnapshot.val().interval * 1000);
      });
    }
  });
  
  var setTrue = function (Qsnapshot){
    Qsnapshot.child('isAvailable').ref().set(true);
  };

  $scope.showAlert = function(item) {
    var now = item.date;
    var newTime = Date.now() - (new Date(now + (item.interval * 1000)));
    $scope.countDown = humanizeDuration(newTime, { round: true });
    var alertPopup = $ionicPopup.alert({
      scope: $scope,
      templateUrl: 'questionInfo-popup.html'
    });
  };
})

.controller('questionAnswerCtrl', function($scope, $stateParams, QuestionFactory, ModalService, timerFactory, PointsFactory, $cordovaLocalNotification, dateFactory, $timeout) {
  var list = QuestionFactory;
  var studyItem = list.$getRecord($stateParams.studyItemId);
  var points = PointsFactory;
  $scope.points = points;

  $scope.studyItem = studyItem;

  $scope.timeConversion = function(sec) {
    var timeConverterHash = { 5: "5 seconds", 25: "25 seconds", 120: "2 minutes", 600: "10 minutes", 3600: "an hour"};
    return timeConverterHash[sec]
  }

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
      setAvailability($stateParams.studyItemId);
      dateFactory.newDate($stateParams.studyItemId);
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
      setAvailability($stateParams.studyItemId);
      dateFactory.newDate($stateParams.studyItemId);
      questionNotify(timerFactory.minusNotificationTime(studyItem.interval));
    }
  };

  var setAvailability = function (id){
    var availableRef = new Firebase('https://studymemoria.firebaseio.com/MyStudies/'+ id +'/isAvailable');
    availableRef.set(false);
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
      return (current_value += 1);
    });
  };
  var reducePower = function() {
    var powerRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
    if (powerRef.key() > 0){
    powerRef.transpaction(function(current_value) {
        return (current_value -= 1);
      });
    }
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
