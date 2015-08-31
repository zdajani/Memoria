angular.module('starter.controllers', ['ngCordova', 'ngDraggable', 'firebase'])

.controller('KnomiCtrl', function($scope, $cordovaLocalNotification, foodFactory, PointsFactory, PowerFactory, $firebaseArray, ModalService, $firebase) {
  $scope.foods = foodFactory.food();

  var points = PointsFactory;
  $scope.points = points;
  var power = PowerFactory;
  $scope.power = power;

  $scope.knomiTalk = function() {
   var now = new Date().getTime();
   var _X_sec_from_now = new Date(now + 5 * 1000);
   // $cordovaLocalNotification.schedule({
   //   id: 1839650917265738612378658,
   //   title: "Knomi says:",
   //   text: "Goodbye cruel world 🙀🔫💥🚑",
   //   at: _X_sec_from_now,
   // });
   // $cordovaLocalNotification.schedule({
   //   id: 183965096598236577257582,
   //   title: "Knomi says:",
   //   text: "Mommy are we poor? 😿",
   //   at: _X_sec_from_now,
   // });
  //  $cordovaLocalNotification.schedule({
  //    id: 183969826519767592875984635,
  //    title: "Knomi says:",
  //    text: "I love you oh so much 😻",
  //    at: _X_sec_from_now,
  //  });
};

  $scope.onPotionComplete = function(){
    foodFactory.removeFood();
    add2Power();
    $scope.essencePresence = false;
    $scope.isRolling = true;
  };

  function add2Power() {
    var powerRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
    powerRef.transaction(function(current_value) {
      return (current_value += 2);
    });
  }

  $scope.essencePresence = false;

  $scope.preSuperEvolve = function() {
    $scope.essencePresence = true;
    $scope.isExcited = 'super';
    $scope.isRolling = 'super';
  };

  $scope.devolve = function() {
    $scope.isExcited = false;
    $scope.isRolling = false;
  };

  $scope.isRolling = false;

  $scope.roll = function() {
    $scope.isRolling = true;
  };

  $scope.isExcited = false;

  $scope.excite = function() {
    $scope.isExcited = true;
  };

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

  function addPower() {
    var powerRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
    powerRef.transaction(function(current_value) {
      return (current_value += 1);
    });
  }



  $scope.notify = function() {
    $scope.isExcited = false;
    $scope.isRolling = false;
    var pointsRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
    pointsRef.transaction(function(current_value) {
      return (current_value = 500);
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
    var answerStripped = $scope.items.answer.replace(/^\s+|\s+$/g,'');
    var questionWithoutSpaces = $scope.items.question.replace(/^\s+|\s+$/g,'');
    $scope.items.$add({
      question: questionWithoutSpaces,
      answer: answerStripped,
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

.controller('questionAnswerCtrl', function($scope, $stateParams, QuestionFactory, ModalService, timerFactory, PointsFactory, $cordovaLocalNotification, $timeout, changeInfo) {
  var studyItem = QuestionFactory.$getRecord($stateParams.studyItemId);
  var questionRef = changeInfo.getRef($stateParams.studyItemId);
  $scope.points = PointsFactory;

  $scope.studyItem = studyItem;

  $scope.timeConversion = function(sec) {
    var time = humanizeDuration(sec * 1000, { round: true });
    return time;
  };

  $scope.validateAnswer = function(answer) {
    answer = answer.replace(/^\s+|\s+$/g,'');
    if (answer.toLowerCase() === studyItem.answer.toLowerCase()) {
      ModalService
        .init('modals/correctAnswer-modal.html', $scope)
        .then(function(modal) {
          modal.show();
      });
      changeInfo.correctAnswer(questionRef, studyItem.interval );
      addPoints();
      questionNotify(timerFactory.addNotificationTime(studyItem.interval));
    }
    else {
      ModalService
        .init('modals/wrongAnswer-modal.html', $scope)
        .then(function(modal) {
          modal.show();
        });
      changeInfo.wrongAnswer(questionRef, studyItem.interval);
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

  function addPoints() {
    var pointsRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
    pointsRef.transaction(function(current_value) {
      return (current_value += 1);
    });
  }
  
  function reducePower() {
    var powerRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
    powerRef.transaction(function(current_value) {
      // if (current_value > 0){
        return (current_value -= 1);
      // }
    });
  }
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
