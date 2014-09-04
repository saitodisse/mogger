by: [saitodisse](http://saitodisse.github.io/)

[![Build Status](https://travis-ci.org/saitodisse/mogger.svg?branch=0.1)](https://travis-ci.org/saitodisse/mogger)

#Mogger
Mogger it is a way to log your app without change him. Uses AOP (Aspect-oriented programming) library named [meld.js](https://github.com/cujojs/meld) and other library that facilitates the print of colorful outputs in browser, the [colorful-logger](https://github.com/saitodisse/colorful-logger).

The goal of this library is to be easy to configure and to help the programmer to understand the inner of some javascript codes.

##Instalation
###bower
```
bower install mogger --save
```
###npm
```
npm install mogger --save
```

##Configuring Mogger
###browser globals
```html
<script src="bower_components/colorful-logger/src/colorful-logger.js"></script>
<script src="bower_components/lodash/dist/lodash.min.js"></script>
<script src="bower_components/meld/aspect/trace.js"></script>
<script src="bower_components/meld/meld.js"></script>
...
```

###AMD (require.js)
```javascript
define(['Mogger'], function (Mogger) {
});
```

###CommonJS (node.js)
```javascript
var Mogger = require('Mogger');
```

##Usage
```javascript
// get the tracer
var tracer = new Mogger({/* global configurations */});

// start watching some targets
tracer.traceObj({
  before: { message: 'SimpleObj -> ', css: 'color: #A42' },
  target: simpleObj, targetConfig: {  css: 'color: #E42' }
});
```


##Testing and debugging
```javascript
//instal tools
sudo npm install -g mocha
sudo npm install -g node-inspector

// test + watch
npm test

// debug + watch
node-debug _mocha --watch
```


##Examples
  - [simple example](http://saitodisse.github.io/mogger/examples/simple-browser-global-example/index.html)
  - [todo mvc example](http://saitodisse.github.io/mogger/examples/todo-mvc-backbone-require/index.html)

