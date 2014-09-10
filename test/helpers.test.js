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


describe('Helpers Functions', function(){

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
