
describe('Knomi', function() {
  beforeEach(function() {
    var width = 375;
    var height = 700;
    browser.driver.manage().window().setSize(width, height);
    browser.get('http://localhost:8100/#/tab/knomi');
    element(by.id('notify')).click();
    browser.sleep(3000);
  });

  it('has a food item', function() {
    expect(hasClass(element(by.className('foodItem')), 'ng-hide')).toBe(false);
  });

  it('does not have a speech bubble', function() {
    expect(hasClass(element(by.className('speech')), 'ng-hide')).toBe(true);
  });

  it('has no food and has speech when notify', function() {
      browser
        .actions()
        .dragAndDrop(element(by.className("foodItem")), element(by.className("starterKnomi")))
        .perform()
        .then(function() {
      browser.sleep(3000);
      expect(hasClass(element(by.className('foodItem')), 'ng-hide')).toBe(true);
      expect(hasClass(element(by.className('speech')), 'ng-hide')).toBe(false);
    })
  });

  var hasClass = function (element, cls) {
      return element.getAttribute('class').then(function (classes) {
          return classes.split(' ').indexOf(cls) !== -1;
      });
  };

  it('displays points', function() {
    element(by.id('notify')).click();
    var pointsSpan = element(by.className('userPoints'))
    expect(pointsSpan.getText()).toContain('10')
  })

  it('reduces your points by 5 when you feed it', function() {
    var pointsSpan = element(by.className('userPoints'))
    browser
      .actions()
      .dragAndDrop(element(by.className("foodItem")), element(by.className("starterKnomi")))
      .perform()
      .then(function() {
        browser.sleep(3000);
        expect(pointsSpan.getText()).toContain('5');
        element(by.id('notify')).click();
      })
  })

  it('has a food cart which tells you how to feed your knomi', function() {
    element(by.id('foodCart')).click();
    expect(element(by.id('vendorModal')).getText()).toContain('You can buy food from me');
  })

});
