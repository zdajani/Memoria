// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngDraggable', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })

  // Each tab has its own nav history stack:

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
        templateUrl: 'templates/technology.html',
        controller: 'AboutCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/questions');

});
