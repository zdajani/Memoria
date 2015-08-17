angular.module('starter.controllers', ['ngCordova', 'ngDraggable', 'firebase'])

.controller('KnomiCtrl', function($scope, $cordovaLocalNotification, foodFactory, PointsFactory, PowerFactory, $firebaseArray, ModalService) {
  $scope.foods = foodFactory.food();
  // $scope.visibilityControl = false;

  var newUser = true

  PointsFactory.$loaded().then(function() {
    $scope.points = PointsFactory.$value
  })

  PowerFactory.$loaded().then(function() {
    $scope.health = PowerFactory.$value
  })

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
    }
  };

  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/Points');

  $scope.feed = function() {
    $scope.health += 1
    $scope.points -= 5
    var newData = {knomi_power: $scope.health, user_points: $scope.points}
    itemRef.update(newData)
  };

  $scope.notify = function() {
    itemRef.update({knomi_power: 0, user_points: 10})
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
    foodFactory.removeFood();
    // $scope.visibilityControl = !$scope.visibilityControl;
    // setTimeout(function ()
    // {
    //   $scope.$apply(function()
    //   {
    //     $scope.visibilityControl = !$scope.visibilityControl;
    //   });
    // }, 10000);
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
