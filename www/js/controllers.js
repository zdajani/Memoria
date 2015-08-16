angular.module('starter.controllers', ['ngCordova', 'ngDraggable', 'firebase'])

.controller('KnomiCtrl', function($scope, $cordovaLocalNotification, foodFactory, $ionicModal, $firebaseArray) {
  $scope.foods = [foodFactory.randomFood()];
  $scope.visibilityControl = false;



  $scope.feed = function() {
    $scope.health += 1
    $scope.points -= 5
    var newData = {knomi_power: $scope.health, user_points: $scope.points}
    console.log(newData)
    itemRef.update(newData)
    if ($scope.points < 1) {
      $scope.openModal();
    };
  };

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    console.log('modal');
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.$on('modal.hidden', function() {
    // things to do on hide of modal
  });

  $scope.$on('modal.removed', function() {
    // things to do on removing of modal
  });

  $scope.notify = function() {
    itemRef.update({knomi_power: 0, user_points: 10})
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
  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/Points');
  itemRef.on("value", function(snapshot) {
    allData = (snapshot.val());
    console.log(allData.user_points);
    $scope.points = allData.user_points;
    $scope.health = allData.knomi_power;
  });
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

.controller('questionAnswerCtrl', function($scope, $stateParams, QuestionFactory) {
  
    var list = QuestionFactory;
    var studyItem = list.$getRecord($stateParams.studyItemId);
    
    $scope.question = studyItem.question;

})

.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
