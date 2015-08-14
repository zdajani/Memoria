describe('questions tab', function(){
  
  var addQuestionbtn = $('[ng-click="addQuestion()"]');
  var goToAddQuestion = element(by.id('goAddQbtn'));
  
  beforeEach(function() {
    browser.get('http://localhost:8100');
  });
  
  // it('has a plus icon', function(){
  //   expect($('[ng-click="addQuestion()"]').isDisplayed());
  // });
  // 
  describe('adding questions', function(){
    it('should redirect you to the question input page', function(){
      addQuestionbtn.click();
      expect(browser.getLocationAbsUrl()).toMatch("/add-question");
    });
    
    
    
  });
  
  

  

});
