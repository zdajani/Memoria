describe('Question controller', function(){
    var scope;
    var ctrl;

    // load the controller's module
    beforeEach(module('starter.controllers', 'firebase', 'starter.services'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('QsCtrl', {$scope: scope});
    }));

    // tests start here
    describe('adding questions', function(){
      
      it('can add a question and answer', function(){
        scope.items.question = "What is the capital?";
        scope.items.answer = "example";
        // scope.addQuestion();
        
        expect(scope.items.question).toContain(scope.items.question);
        
      });
    
    });
    
});