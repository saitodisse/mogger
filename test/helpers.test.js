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
var helpers = require('../src/helpers');
var _ = require('lodash');


describe('Helpers Functions', function(){

	describe('merge()', function () {

		var someObj = {prop1: 'prop1_value'};

		it('add property to an object', function() {
			var newObject = helpers.merge({}, someObj);
			assert.deepEqual(someObj, newObject);
		});

		it('if source object is undefined or null or number', function() {
			var newObject = helpers.merge(undefined, someObj);
			assert.notDeepEqual(someObj, newObject);

			newObject = helpers.merge(null, someObj);
			assert.notDeepEqual(someObj, newObject);

			newObject = helpers.merge(1, someObj);
			assert.notDeepEqual(someObj, newObject);
		});

		it('destination object will be overridden by source', function() {
			var newObject = helpers.merge(someObj, {prop1: 'prop1_value_new'});
			assert.deepEqual({prop1: 'prop1_value_new'}, newObject);
		});

		it('deep cloned', function() {
			var complexObj = {prop1: { prop2 : { prop3: 'prop1_value'}}};
			var newObject = helpers.merge({}, complexObj);
			assert.deepEqual(newObject, complexObj);
		});

	});

	describe('checkRelevantArguments()', function () {

		it('when array is empty, returns false', function () {
			var returned = helpers.checkRelevantArguments([]);
			assert.equal(false, returned);
		});

		describe('accepted types', function () {
			it('string', function () {
				assert.equal(false, helpers.checkRelevantArguments(['']));
				assert.equal(true, helpers.checkRelevantArguments(['someValue']));
			});
			it('number', function () {
				assert.equal(true, helpers.checkRelevantArguments([1]));
			});
			it('boolean', function () {
				assert.equal(true, helpers.checkRelevantArguments([true]));
				assert.equal(true, helpers.checkRelevantArguments([false]));
			});
			it('array', function () {
				assert.equal(false, helpers.checkRelevantArguments([[]]));
				assert.equal(true, helpers.checkRelevantArguments([[1,2]]));
			});
			it('object', function () {
				assert.equal(false, helpers.checkRelevantArguments({}));
				assert.equal(true, helpers.checkRelevantArguments([{someProp:'value'}]));
			});
		});


	});

});
