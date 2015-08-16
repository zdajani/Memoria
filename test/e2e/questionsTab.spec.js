describe('questions tab', function(){

  var goToAddQuestion = element(by.id('goAddQbtn'));
  var question = element(by.className('item-content'));

  beforeEach(function() {
    browser.get('http://localhost:8100');
  });

  it('should redirect you to the question input page', function(){
    goToAddQuestion.click();
    expect(browser.getLocationAbsUrl()).toMatch("/add-question");
  });

  it('should have the questions added listed', function(){
    var questionList = element.all(by.repeater('items'));
    expect(questionList.get(0).getText()).toContain("What is the capital of Palestine?");
    expect(questionList.get(1).getText()).toContain("What is the capital of England?");
  })

  it('should take you to answer the question when you click on the question', function() {
    question.click();
    expect(browser.getLocationAbsUrl()).toMatch("/tab/questions/-JwWpAkrYaM3KJvP51yM");
  })

});
