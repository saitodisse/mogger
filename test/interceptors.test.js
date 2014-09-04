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

/**
 * STUBS
 */
var interceptor_item_A = {
	filterRegex: /^__a.*/i,
	callback: function(info) {
		return '__a:' + info.method;
	}
};
var interceptor_item_B = {
	filterRegex: /^__b.*/i,
	callback: function(info) {
		return '__b:' + info.method;
	}
};
var interceptor_item_X = {
	filterRegex: /^__x.*/i,
	callback: function(info) {
		return '__x:' + info.method;
	}
};

var interceptors_list = [
	interceptor_item_A,
	interceptor_item_B,
	interceptor_item_X
];

var info_stub = {
	globalInterceptors: interceptor_item_A,
	localInterceptors: {},
	info: {
		method: 'METHOD_NAME'
	}
};


describe('Interceptors', function(){

	// beforeEach(function(){
	//    });

	// afterEach(function(){
	//    });


	describe('checkExistingInterceptors()', function () {

		it('no interceptor, returns false', function() {
			var infoStub = {
				globalInterceptors: undefined,
	        	localInterceptors: undefined,
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
			};

			assert.equal(false, interceptorsHelpers.checkExistingInterceptors(infoStub));
		});

		it('only global, return true', function() {
			var infoStub = {
				globalInterceptors: {},
	        	localInterceptors: undefined,
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
			};

			assert.equal(true, interceptorsHelpers.checkExistingInterceptors(infoStub));
		});

		it('only local, return true', function() {
			var infoStub = {
				globalInterceptors: undefined,
	        	localInterceptors: {},
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
			};

			assert.equal(true, interceptorsHelpers.checkExistingInterceptors(infoStub));
		});

		it('local and global, return true', function() {
			var infoStub = {
				globalInterceptors: {},
	        	localInterceptors: {},
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
			};

			assert.equal(true, interceptorsHelpers.checkExistingInterceptors(infoStub));
		});
	});


	describe('matchInterceptor()', function () {
		it('match a single interceptor', function() {
			var result = interceptorsHelpers.matchInterceptor(interceptor_item_A, '__a_method');
			assert.equal(interceptor_item_A, result);
		});

		it('false if do not match', function() {
			var result = interceptorsHelpers.matchInterceptor(interceptor_item_A, '__b_method');
			assert.equal(false, result);
		});
	});


	describe('selectInterceptor()', function () {
		// singles
		it('can select a single interceptor', function() {
			var result = interceptorsHelpers.selectInterceptor(interceptor_item_A, '__a_method');
			assert.equal(interceptor_item_A, result);
		});
		it('false if do not match', function() {
			var result = interceptorsHelpers.selectInterceptor(interceptor_item_A, '__ZZZ_method');
			assert.equal(false, result);
		});

		// lists
		it('can select in a list', function() {
			var result = interceptorsHelpers.selectInterceptor(interceptors_list, '__a_method');
			assert.equal(interceptor_item_A, result);
		});
		it('false if do not match in the list', function() {
			var result = interceptorsHelpers.selectInterceptor(interceptors_list, '__ZZZ_method');
			assert.equal(false, result);
		});
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
