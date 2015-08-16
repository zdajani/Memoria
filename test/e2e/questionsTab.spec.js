describe('questions tab', function(){
  
  var goToAddQuestion = element(by.id('goAddQbtn'));
  
  beforeEach(function() {
    browser.get('http://localhost:8100');
  });
  
  it('should redirect you to the question input page', function(){
    goToAddQuestion.click();
    expect(browser.getLocationAbsUrl()).toMatch("/add-question");
  });

});
