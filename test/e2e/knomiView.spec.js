
describe('Knomi', function() {
  beforeEach(function() {
    browser.get('http://localhost:8100/#/tab/knomi');
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

});


// page.find('#profile-avatar')['src'].should have_content 'default.png'
