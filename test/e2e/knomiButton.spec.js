describe('Clicking Notification button', function(){

  beforeEach(function() {
    browser.get('http://localhost:8100');
  });

  it('has a button', function(){
    browser.get('http://localhost:8100/#/tab/knomi');
    browser.sleep(5000);
    expect(element(by.id('knomi-page')).getText()).toContain('Notify');
  });



});

