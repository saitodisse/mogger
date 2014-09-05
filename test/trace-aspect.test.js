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
var sinon = require('sinon');
var _ = require('lodash');
var traceAspect = require('../src/trace-aspect');

describe('Trace Aspect (meld)', function (){

	var onCallSpy, onReturnSpy, onThrowSpy, traceAspectFunction;
	beforeEach(function () {
		var jp = function() {
			return {
				method: '',
				target: '',
				args: []
			};
		};

		onCallSpy = sinon.spy();
		onReturnSpy = sinon.spy();
		onThrowSpy = sinon.spy();
		var reportSpy = {
			onCall: onCallSpy,
			onReturn: onReturnSpy,
			onThrow: onThrowSpy,
		};

		traceAspectFunction = traceAspect(reportSpy, jp);
	});

	it('no jointpoint', function() {
		traceAspectFunction = traceAspect(null);
		assert.equal(true, _.isObject(traceAspectFunction));
	});

	it('before meld function call', function() {
		traceAspectFunction.before();
		assert.equal(true, onCallSpy.called);
	});

	it('afterReturning meld function call', function() {
		traceAspectFunction.afterReturning({result: null});
		assert.equal(true, onReturnSpy.called);
	});

	it('afterThrowing meld function call', function() {
		traceAspectFunction.afterThrowing({exception: null});
		assert.equal(true, onThrowSpy.called);
	});


});
