/** @license MIT License (c) Copyright (c) 2014 Julio Makdisse Saito */

/**
 * Mogger
 * Meld + Trace + Colorful logger
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Julio Makdisse Saito (saitodisse@gmail.com)
 * @version 0.5.0
 */


var assert = require('assert');
var interceptorsHelpers = require('../src/interceptors-helpers');

describe('Check Interceptors', function(){

	beforeEach(function(){
    });

	afterEach(function(){
    });


	it('no interceptor, returns method name', function() {
		var infoStub = {
			globalInterceptors: undefined,
        	localInterceptors: undefined,
        	info: {
        		method: 'METHOD_NAME'
        	}
		};

		assert.equal(false, interceptorsHelpers.checkExistingInterceptors(infoStub));
	});

	// it('no interceptor, returns method name', function() {
	// 	var infoStub = {
	// 		globalInterceptors: undefined,
 //        	localInterceptors: undefined,
 //        	info: {
 //        		method: 'METHOD_NAME'
 //        	}
	// 	};

	// 	assert.equal('METHOD_NAME', checkInterceptors(infoStub));
	// });

	// /*
	// 	------------------------------------------------------------------------------------
	// 	# interceptors
	// 	------------------------------------------------------------------------------------
	// 	:: interceptors can modify the way that log is printed
	// 	------------------------------------------------------------------------------------
	// */
	// it('interceptors will log arguments', function() {
	// 	//the object and his function
	// 	var someObj = {
	// 		addNumbers: function (arg1, arg2) { return arg1 + arg2; },
	// 		otherFunction: function (arg1, arg2) { return arg1 + arg2; }
	// 	};

	// 	//trace
	// 	tracer.traceObj({
	// 		target: someObj,
	// 		interceptors: {
	// 			filterRegex: /otherFunction/i,
	// 			callback: function(info) {
	// 				return info.method + '(' + info.args[0] + ', ' + info.args[1] + ')';
	// 			}
	// 		}
	// 	});

	// 	//call each one time
	// 	someObj.addNumbers(1, 2);
	// 	someObj.otherFunction(1, 2);

	// 	//someObj.addNumbers and someObj.addNumbers again
	// 	assert.equal(2, fakeConsole.logRecorder.length);
	// 	assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
	// 	assert.equal('otherFunction(1, 2)', fakeConsole.logRecorder[1].message);
	// });

	// /*
	// 	------------------------------------------------------------------------------------
	// 	# global interceptors
	// 	------------------------------------------------------------------------------------
	// 	:: global interceptors can modify the way that all logs are printed
	// 	------------------------------------------------------------------------------------
	// */
	// it('global interceptors', function() {
	// 	tracer = new Mogger({
	// 		stdout: fakeConsole,
	// 		showPause: true,
	// 		interceptors: {
	// 			filterRegex: /.*/i,
	// 			callback: function(info) {
	// 				return info.method + '(' + info.args[0] + ', ' + info.args[1] + ')';
	// 			}
	// 		}
	// 	});

	// 	//the object and his function
	// 	var someObj = {
	// 		addNumbers: function (arg1, arg2) { return arg1 + arg2; },
	// 		otherFunction: function (arg1, arg2) { return arg1 + arg2; }
	// 	};

	// 	//trace
	// 	tracer.traceObj({
	// 		target: someObj,
	// 	});

	// 	//call each one time
	// 	someObj.addNumbers(1, 2);
	// 	someObj.otherFunction(1, 2);

	// 	//someObj.addNumbers and someObj.addNumbers again
	// 	assert.equal(2, fakeConsole.logRecorder.length);
	// 	assert.equal('addNumbers(1, 2)', fakeConsole.logRecorder[0].message);
	// 	assert.equal('otherFunction(1, 2)', fakeConsole.logRecorder[1].message);
	// });


	// 	------------------------------------------------------------------------------------
	// 	# global interceptors vs local interceptors
	// 	------------------------------------------------------------------------------------
	// 	:: global interceptors can modify the way that all logs are printed
	// 	------------------------------------------------------------------------------------

	// it('local interceptors wins/overlaps global interceptors', function() {
	// 	tracer = new Mogger({
	// 		stdout: fakeConsole,
	// 		showPause: true,

	// 		// GLOBAL INTERCEPTORS
	// 		interceptors: {
	// 			filterRegex: /.*/i,
	// 			callback: function(info) {
	// 				return '->' + info.method;
	// 			}
	// 		}

	// 	});

	// 	//the object and his function
	// 	var someObj = {
	// 		addNumbers: function (arg1, arg2) { return arg1 + arg2; },
	// 		otherFunction: function (arg1, arg2) { return arg1 + arg2; }
	// 	};

	// 	//trace
	// 	tracer.traceObj({
	// 		target: someObj,

	// 		// LOCAL INTERCEPTORS
	// 		interceptors: {
	// 			filterRegex: /addNumbers/i,
	// 			callback: function(info) {
	// 				return info.method + '(' + info.args[0] + ', ' + info.args[1] + ')';
	// 			}
	// 		}

	// 	});

	// 	//call each one time
	// 	someObj.addNumbers(1, 2);
	// 	someObj.otherFunction(1, 2);

	// 	//someObj.addNumbers and someObj.addNumbers again
	// 	assert.equal(2, fakeConsole.logRecorder.length);
	// 	assert.equal('addNumbers(1, 2)', fakeConsole.logRecorder[0].message);
	// 	assert.equal('->otherFunction', fakeConsole.logRecorder[1].message);
	// });


	// /*
	// 	------------------------------------------------------------------------------------
	// 	# many interceptors
	// 	------------------------------------------------------------------------------------
	// */
	// it('several interceptors can be configured', function() {
	// 	tracer = new Mogger({
	// 		stdout: fakeConsole,
	// 		showPause: true,

	// 		// GLOBAL INTERCEPTORS
	// 		interceptors: [
	// 		{
	// 			filterRegex: /^a.*/i,
	// 			callback: function(info) {
	// 				return '[1] ' + info.method;
	// 			}
	// 		},
	// 		{
	// 			filterRegex: /^b.*/i,
	// 			callback: function(info) {
	// 				return '[2.1] ' + info.method;
	// 			}
	// 		}]

	// 	});

	// 	//the object and his function
	// 	var someObj = {
	// 		aFunc: function (arg1, arg2) { return arg1 + arg2; },
	// 		bFunc: function (arg1, arg2) { return arg1 + arg2; },
	// 		cFunc: function (arg1, arg2) { return arg1 + arg2; }
	// 	};

	// 	//trace
	// 	tracer.traceObj({
	// 		target: someObj,

	// 		// LOCAL INTERCEPTORS
	// 		interceptors: [
	// 		{
	// 			filterRegex: /^b.*/i,
	// 			callback: function(info) {
	// 				return '[2.2] ' + info.method;
	// 			}
	// 		},
	// 		{
	// 			filterRegex: /^c.*/i,
	// 			callback: function(info) {
	// 				return '[3] ' + info.method;
	// 			}
	// 		}]

	// 	});

	// 	//call each one time
	// 	someObj.aFunc(1, 2);
	// 	someObj.bFunc(1, 2);
	// 	someObj.cFunc(1, 2);

	// 	//someObj.addNumbers and someObj.addNumbers again
	// 	assert.equal(3, fakeConsole.logRecorder.length);
	// 	assert.equal('[1] aFunc', fakeConsole.logRecorder[0].message);
	// 	assert.equal('[2.2] bFunc', fakeConsole.logRecorder[1].message);
	// 	assert.equal('[3] cFunc', fakeConsole.logRecorder[2].message);
	// });


});
