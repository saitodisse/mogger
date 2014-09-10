'use strict';

var Mogger = require('mogger');

/*

file:     home-page.js
class:    HomePage
instance: homePage

*/

module.exports = function() {

	/**
	 * some trivial object with two methods
	 */
	var simpleObj = {
	  	methodA: function() {},
	  	methodB: function() {}
	};


	/**
	 * configuring mogger
	 * add the surrogateTargets array.
	 */
	var mogger = new Mogger({
		surrogateTargets: [{ title: 'SIMPLE_OBJ', target: simpleObj }]
	});
	mogger.defaultConsole.log('Welcome to Mogger!');

	/**
	 * tracing all methods from simpleObj
	 */
	mogger.traceObj({
    	before: { message: 'Simple Obj:', css: 'color: #A42' },
    	target: 'SIMPLE_OBJ', targetConfig: {  css: 'color: #E42' }
  	});


	/**
	 * call the simpleObj methods
	 */
	simpleObj.methodA();
	simpleObj.methodB();


};
