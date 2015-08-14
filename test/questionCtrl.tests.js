describe('Question controller', function(){
    var scope;

    // load the controller's module
    beforeEach(module('starter.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('QsCtrl', {$scope: scope});
    }));

    // tests start here
    describe('adding questions', function(){
      
      it('can add a question and answer', function(){
        scope.items.question = "What is the capital of Palestine?"
        scope.items.answer = "Jerusalem"
        scope.addQuestion();
        
        expect(scope.items.question).toEqual("What is the capital of Palestine?");
        expect(scope.items.answer).toEqual("Jerusalem");
      });
    
    });
    
});