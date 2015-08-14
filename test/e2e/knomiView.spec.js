describe('Knomi', function() {
  beforeEach(function() {
    browser.get('http://localhost:8100/#/tab/knomi');
  });

  it('has a background-image', function() {
    browser.sleep(5000)
    var background = element(by.css(".gameArea"));
    var backgroundStyle = background.getAttribute('style');
    // console.log(backgroundStyle);
    // expect(backgroundStyle.getCssValue('background-image').toEqual('url("../img/field.png"'))
    // expect(element(by.css(".gameArea")).toContain()
  }.then(function() {
    expect(backgroundStyle.getCssValue('background-image').toEqual('url("../img/field.png"'))
  }));


});

// page.find('#profile-avatar')['src'].should have_content 'default.png'