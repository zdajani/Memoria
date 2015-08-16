describe('recall-tab', function(){

  var question = element(by.className('item-content'));

  beforeEach(function() {
    browser.get('http://localhost:8100');
  });

  it('should show the selected question', function() {
    question.click();
    expect(element(by.id('question').getText()).toContain('What is the capital of Palestine?'))
  })



});
