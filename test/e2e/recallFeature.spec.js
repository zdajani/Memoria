describe('recall-tab', function(){

  var question = element(by.className('item-content'));
  var studyItemQ = element(by.id('questionAnswer'))

  beforeEach(function() {
    browser.get('http://localhost:8100');
  });

  it('should show the selected question', function() {
    question.click();
    expect((studyItemQ).getText()).toContain('What is the capital of Palestine?');
  })



});
