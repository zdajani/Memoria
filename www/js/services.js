angular.module('starter.services', [])

.factory('foodFactory', function(){
  var food = [{
    id: 0,
    name: 'Sandwich',
    location: './img/sammich.png'
  }, {
    id: 1,
    name: 'Rice',
    location: './img/rice.png'
  }, {
    id: 2,
    name: 'Taco',
    location: './img/taco.png'
  }];

  return {
    randomFood: function() {
      return food[Math.floor(Math.random() * food.length)]
    }
  }
})
