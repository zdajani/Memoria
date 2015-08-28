angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngDraggable', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })

  .state('tab.knomi', {
    url: '/knomi',
    views: {
      'tab-knomi': {
        templateUrl: 'templates/tab-knomi.html',
        controller: 'KnomiCtrl'
      }
    }
  })

  .state('vendorModal', {
    views: {
      templateUrl: 'modals/vendor-modal.html'
    }
  })

  .state('evolution1Modal', {
    views: {
      templateUrl: 'modals/evolution1-modal.html'
    }
  })

  .state('evolution2Modal', {
    views: {
      templateUrl: 'modals/evolution2-modal.html'
    }
  })

  .state('evolution3Modal', {
    views: {
      templateUrl: 'modals/evolution3-modal.html'
    }
  })

  .state('tab.questions', {
      url: '/questions',
      views: {
        'tab-questions': {
          templateUrl: 'templates/tab-questions.html',
          controller: 'QsCtrl'
        }
      }
    })

  .state('questionModal', {
    views: {
      templateUrl: 'modals/question-modal.html'
    }
  })

  .state('tab.question-answer', {
    url: '/questions/:studyItemId',
    views: {
      'tab-questions': {
        templateUrl: 'templates/question-answer.html',
        controller: 'questionAnswerCtrl'
      }
    }
  })

  .state("correctAnswerModal", {
    views: {
      templateUrl: "modals/correctAnswerModal.html"
    },
  })

  .state("wrongAnswerModal", {
    views: {
      templateUrl: "modals/wrongAnswerModal.html"
    },
  })

  .state('tab.addQuestion', {
    url: '/add-question',
    views: {
      'tab-questions': {
        templateUrl: 'templates/add-question.html',
        controller: 'QsCtrl'
      }
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/questions');

});
