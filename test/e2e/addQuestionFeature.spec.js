describe('questions tab', function(){
  
  var addQuestionbtn = $('[ng-click="addQuestion()"]');
  var goToAddQuestion = element(by.id('goAddQbtn'));
  var addQbox = element(by.model('items.question'));
  var addAnswerBox = element(by.model('items.answer'));
  
  beforeEach(function() {
    browser.get('http://localhost:8100');
    goToAddQuestion.click();
  });
  

  it('adds a question', function(){
    addQbox.sendKeys('What is the capital of Palestine');
    addAnswerBox.sendKeys('Jerusalem')
    addQuestionbtn.click();
    expect(browser.getLocationAbsUrl()).toMatch("/tab/questions");
  });

});

