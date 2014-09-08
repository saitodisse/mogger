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
	method: '__a_METHOD_NAME'
};


describe('Interceptors Helpers', function(){

	// beforeEach(function(){
	//    });

	// afterEach(function(){
	//    });


	describe('checkExistingInterceptors()', function () {

		it('no interceptor, returns false', function() {
			var interceptorsObj = {
				globalInterceptors: undefined,
	        	localInterceptors: undefined,
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
			};

			assert.equal(false, interceptorsHelpers.checkExistingInterceptors(interceptorsObj));
		});

		it('only global, return true', function() {
			var interceptorsObj = {
				globalInterceptors: {},
	        	localInterceptors: undefined,
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
			};

			assert.equal(true, interceptorsHelpers.checkExistingInterceptors(interceptorsObj));
		});

		it('only local, return true', function() {
			var interceptorsObj = {
				globalInterceptors: undefined,
	        	localInterceptors: {},
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
			};

			assert.equal(true, interceptorsHelpers.checkExistingInterceptors(interceptorsObj));
		});

		it('local and global, return true', function() {
			var interceptorsObj = {
				globalInterceptors: {},
	        	localInterceptors: {},
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
			};

			assert.equal(true, interceptorsHelpers.checkExistingInterceptors(interceptorsObj));
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

	describe('applyInfoToInterceptor()', function () {
		it('apply infoObj to the interceptor', function() {
			var result = interceptorsHelpers.applyInfoToInterceptor(interceptor_item_A, info_stub);
			assert.equal('__a:' + '__a_METHOD_NAME', result);
		});
	});


	describe('checkAndApplyInterceptor()', function () {
		it('no interceptors, return method name', function() {

			var interceptorsObj = {
				globalInterceptors: undefined,
	        	localInterceptors: undefined,
	        	info: {
	        		method: 'METHOD_NAME'
	        	}
	        };

			var result = interceptorsHelpers.checkAndApplyInterceptor(interceptorsObj);

			assert.equal('METHOD_NAME', result);
		});

		it('with interceptors, return global', function() {

			var interceptorsObj = {
				globalInterceptors: interceptor_item_A,
	        	localInterceptors: undefined,
	        	info: {
	        		method: '__a_METHOD_NAME'
	        	}
	        };

			var result = interceptorsHelpers.checkAndApplyInterceptor(interceptorsObj);

			assert.equal('__a:' + '__a_METHOD_NAME', result);
		});

		it('no match interceptors, return info.method', function() {

			var interceptorsObj = {
				globalInterceptors: interceptor_item_B,
	        	localInterceptors: undefined,
	        	info: {
	        		method: '__a_METHOD_NAME'
	        	}
	        };

			var result = interceptorsHelpers.checkAndApplyInterceptor(interceptorsObj);

			assert.equal('__a_METHOD_NAME', result);
		});
	});
});
