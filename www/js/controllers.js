angular.module('starter.controllers', ['ngCordova', 'ngDraggable'])

.controller('KnomiCtrl', function($scope, $cordovaLocalNotification) {
  $scope.visibilityControl = false;
  $scope.notify = function() {
    $scope.visibilityControl = !$scope.visibilityControl;
    console.log('working')
    var now = new Date().getTime();
    var timeInSeconds = 7
    _X_sec_from_now = new Date(now + timeInSeconds *1000);
    $cordovaLocalNotification.schedule({
      id: 1,
      title: "Title",
      text: "This is a notification",
      at: _X_sec_from_now,
    });
  };
})

.controller('QsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})


.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
