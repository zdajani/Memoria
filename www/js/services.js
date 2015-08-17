angular.module('starter.services', [])


.factory('QuestionFactory', ['$firebaseArray', function($firebaseArray) {
  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/MyStudies');
  return $firebaseArray(itemRef);
}])

.factory('PointsFactory', ['$firebaseObject', function($firebaseObject) {
  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/Points/user_points');
  return $firebaseObject(itemRef);
}])

.factory('PowerFactory', ['$firebaseObject', function($firebaseObject) {
  var itemRef =  new Firebase('https://studymemoria.firebaseio.com/Points/knomi_power');
  return $firebaseObject(itemRef);
}])

.service('ModalService', function($ionicModal, $rootScope) {


  var init = function(tpl, $scope) {

    var promise;
    $scope = $scope || $rootScope.$new();

    promise = $ionicModal.fromTemplateUrl(tpl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });

    $scope.openModal = function() {
       $scope.modal.show();
     };
     $scope.closeModal = function() {
       $scope.modal.hide();
     };
     $scope.$on('$destroy', function() {
       $scope.modal.remove();
     });

    return promise;
  };

  return {
    init: init
  };

})


.factory('foodFactory', function(){
  var food = [{
    id: 0,
    name: 'Sandwich',
    location: './img/sammich.png'
  }, {
    id: 1,
    name: 'Rice',
    location: './img/rice.png'
  }, {
    id: 2,
    name: 'Taco',
    location: './img/taco.png'
  }];

  return {
    randomFood: function() {
      return food[Math.floor(Math.random() * food.length)];
    }
  };
})

.factory('timerFactory', function(){
  
  var time_array = [ 0, 5, 25, 120, 600, 3600];
  
  return {
    addTime: function (questionId) {
      var intervalRef = new Firebase('https://studymemoria.firebaseio.com/MyStudies/'+ questionId + '/interval');
      timer.transaction(function(current_value) {
        var i = time_array.indexOf(current_value);
        return (current_value = time_array[i + 1]);
      });
    },
    minusTime: function (questionId) {
      var intervalRef = new Firebase('https://studymemoria.firebaseio.com/MyStudies/'+ questionId + '/interval');
      intervalRef.transaction(function(current_value) {
        var i = time_array.indexOf(current_value);
        if (current_value > 5) { 
          return (current_value = time_array[i - 1]);
        } else {
          return current_value;
        }
      });
    }
  };
  
  
  
});
