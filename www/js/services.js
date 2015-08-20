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
  var availableFoods = [{
    id: 1,
    name: 'milk',
    location: './img/milk.png'
  },
  {
    id: 3,
    name: 'salmon',
    location: './img/salmon.png'
  },
  {
    id: 30,
    name: 'essence',
    location: './img/essence-hairball.png'
  }];

  var food = [];

  return {
    food: function() {
      return food;
    },
    addFood: function(id) {
      for (var i = 0; i < availableFoods.length; i++) {
        if (availableFoods[i].id === id) {
          food.push(availableFoods[i]);
        }
      }
    },
    removeFood: function() {
      food.pop();
    }
  };
})

.factory('timerFactory', function(){

  var time_array = [ 0, 5, 25, 120, 600, 3600];
  
  return {
    addNotificationTime: function(time) {
      var newTime = time_array.indexOf(time) + 1;
      return time_array[newTime];
    },
    minusNotificationTime: function(time) {
      var newTime;
      if (time > 5) {
        newTime = time_array.indexOf(time) - 1;
    } else {
        newTime = 1;
    }
      return time_array[newTime];
    }
  };

})

.factory('DataFormatting', function() {

  return {
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    addQuestionMark: function(string) {
      if(string.slice(-1) !== "?") {
        return string + "?";
      }
    }
  };
})


.factory('changeInfo', function($timeout){

  var itemRef;
  var time_array = [ 0, 5, 25, 120, 600, 3600];
  
  function findIntervalCorrect(interval) {
    currentInterval = interval;
    i = time_array.indexOf(currentInterval);
    return time_array[i + 1];
  }
  function findIntervalWrong(interval) {
    if (interval > 5){
    currentInterval = interval;
    i = time_array.indexOf(currentInterval);
    return time_array[i - 1];
  } else {
      return interval; 
    }
    
  }
  
  function callAtTimeout(questionRef) {
    questionRef.update({"isAvailable": true});
  }
  
  return {
    getRef: function (questionId) {
      itemRef = new Firebase('https://studymemoria.firebaseio.com/MyStudies/'+ questionId);  
      return itemRef;
    },

    correctAnswer: function(questionRef, interval) {
      questionRef.update({ "date": Date.now(), "interval": findIntervalCorrect(interval), "isAvailable": false});
      $timeout(function() { callAtTimeout(questionRef);}, findIntervalCorrect(interval) * 1000);
  },
  
  wrongAnswer: function(questionRef, interval) {
      questionRef.update({ "date": Date.now(), "interval": findIntervalWrong(interval), "isAvailable": false});
      $timeout(function() { callAtTimeout(questionRef);}, findIntervalWrong(interval) * 1000);
    }
  };
});

