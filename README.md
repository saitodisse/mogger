#Mogger
[![Build Status](https://travis-ci.org/saitodisse/mogger.svg?branch=0.1)](https://travis-ci.org/saitodisse/mogger) [![Coverage Status](https://coveralls.io/repos/saitodisse/mogger/badge.png?branch=0.1)](https://coveralls.io/r/saitodisse/mogger?branch=0.1)

Mogger it is a way to log your app without change him. Uses AOP (Aspect-oriented programming) library named [meld.js](https://github.com/cujojs/meld) and other library that facilitates the print of colorful outputs in browser, the [colorful-logger](https://github.com/saitodisse/colorful-logger).

The goal of this library is to be easy to configure and to help the programmer to understand the inner of some javascript codes.

## Instalation
```
npm install mogger --save
```

## Usage
```javascript
var Mogger = require('Mogger');

// get the tracer
var tracer = new Mogger({
    // list of targets
    surrogateTargets: [
        { title: 'SIMPLE_OBJ', target: simpleObj }
    ]
});

// start watching some targets
tracer.traceObj({
  before: { message: 'SimpleObj -> ', css: 'color: #A42' },
  targetTitle: 'SIMPLE_OBJ', targetConfig: {  css: 'color: #E42' }
});
```


## Testing
```javascript
// test all + watch
gulp

// test something(grep) + watch
mocha --watch -g 'REGEX_NAME_OF_TEST' -G
```

## Testing and debugging
```javascript
// test + watch
gulp

//instal tools
sudo npm install -g mocha
sudo npm install -g node-inspector

// debug + watch
node-debug _mocha --watch
// debug something(grep) + watch
node-debug _mocha --watch -g 'REGEX_NAME_OF_TEST'
```


## Test coverage
```shell
# start coverage + watch
gulp coverage

# open "Code coverage report"
google-chrome coverage/lcov-report/src/index.html
```


## Examples
  - [here](http://saitodisse.github.io/mogger/)

by: [saitodisse](http://saitodisse.github.io/)
