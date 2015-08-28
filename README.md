# Memoria
[![Code Climate](https://codeclimate.com/github/zdajani/memoria/badges/gpa.svg)](https://codeclimate.com/github/zdajani/memoria)

## Synopsis

What if memorisation could be fun? What if a life depended on your memory? What if all of this is possible? It is now, with Memoria!

Memoria is a memorisation mobile game app based on the [spaced repetition learning technique](https://en.wikipedia.org/wiki/Spaced_repetition), which theorises that humans and animals are more likely to remember something if it is recalled multiple times spaced over a long span of time. This learning technique can be used across a vast number of fields from learning languages to the periodical table. 

However, to make learning actually fun and to motivate people to study this app integrates space repetition learning with a virtual pet that requires attention and nurturing to survive and grow. You add the information you want to remember and the app prompts you to answer according to specific time intervals that depend on whether you remember or not. In turn you get money to spend on taking care of your pet, but if you don’t study your pet’s health deteriorates. 

## Technologies and Tools Used
- Language: Javascript
- Frameworks: Ionic, AngularJs
- Database: Firebase
- Testing: Karma, Jasmine, Protractor, PhatomJs
- Other: Cordova Local Notifications, ngDraggable, ngCordova, HTML, CSS, Bootstrap, HumanizeDuration, gulp

## Video Demonstration
##### [Memoria Video](http://www.youtube.com/watch?v=KZX3_Tp1JrA)
[![Memoria](https://github.com/zdajani/memoria/blob/dev/public/Memoira.png)](http://www.youtube.com/watch?v=KZX3_Tp1JrA)


## Job Stories
```
When I am opening the app for the first time,
I want to have an explanation of how the app works,
So I won't be confused 
```

```
When I know how the app works,
I want a place that I can enter a question and its answer,
So that the app can help to test me periodically
```
```
When I go about my day,
I want to be notified when it's time to answer a question,
So that I don't have to keep checking my phone
```
```
When I get a question right,
I want the app to test me in longer time intervals,
So that it tests me just as I am about to forget 
```
```
When I get a question wrong,
I want the app to test me in shorter time intervals,
So that I have a better change at remembering the answers
```
```
When I am unmotivated,
I want to have a pet that depends on me getting the questions right,
So that I am emotionally attached to my learning
```
```
When I have not yet formed a bond with my pet
I want to feed it and take care of it,
So that that I can be more motivated to study
```
```
When I have formed an emotional bond with my pet,
I want there to be negative consequences related to my pet for failing to learn,
So that I am more motivated to remember
```
```
When I am doing well,
I want there to be positive consequences for my pet,
So that my learning is positively reinforced
```
```
When I have been using the app for awhile,
I want to have new feature to explore and for my pet to progress
So that I that I keep using the app and learning more
```

## How to run

```bash
git clone https://github.com/zdajani/memoria.git
cd memoria
ionic platform add ios
ionic emulate ios
```

## Testing

##### Setup

```bash
npm install
npm install -g gulp
npm install -g protractor
```

##### Running Karma

```bash
gulp test
```

##### Running Protractor

* Make a new tab and run `ionic serve`
* Make a new tab and run `webdriver-manager start`

```bash
protractor test/protractor.config.js
```

## Documentation and Practices

[Setting up and using Firebase](https://github.com/zdajani/memoria/wiki/Firebase)


