
describe('Knomi', function() {
  beforeEach(function() {
    var width = 375;
    var height = 700;
    browser.driver.manage().window().setSize(width, height);
    browser.get('http://localhost:8100/#/tab/knomi');
    element(by.id('notify')).click();
    browser.sleep(3000);
  });

  it('has a food cart', function() {
    expect(element(by.id('foodCart')).isPresent()).toBe(true)
  })

  it('has a money sack', function() {
    expect(element(by.id('moneySack')).isPresent()).toBe(true)
  })

  // it('has no food and has speech when notify', function() {
  //     browser
  //       .actions()
  //       .dragAndDrop(element(by.className("foodItem")), element(by.className("starterKnomi")))
  //       .perform()
  //       .then(function() {
  //     browser.sleep(3000);
  //     expect(hasClass(element(by.className('foodItem')), 'ng-hide')).toBe(true);
  //     expect(hasClass(element(by.className('speech')), 'ng-hide')).toBe(false);
  //   })
  // });
  //
  // var hasClass = function (element, cls) {
  //     return element.getAttribute('class').then(function (classes) {
  //         return classes.split(' ').indexOf(cls) !== -1;
  //     });
  // };

  it('displays points', function() {
    var pointsSpan = element(by.className('userPoints'))
    expect(pointsSpan.getText()).toContain('10')
  })

  it('reduces your points by 1 when buy food', function() {
    element(by.id('foodCart')).click();
    element(by.css('#milk img')).click();
    browser.sleep(3000);
    browser
      .actions()
      .dragAndDrop(element(by.className("foodItem")), element(by.className("starterKnomi")))
      .perform()
      .then(function() {
        browser.sleep(3000);
        var pointsSpan = element(by.className('userPoints'))
        expect(pointsSpan.getText()).toContain('9');
      })
  })

  it('has a help button which tells you how to feed your knomi', function() {
    element(by.id('help')).click();
    expect(element(by.id('vendorModal')).getText()).toContain('You can buy food from me');
  })

});
