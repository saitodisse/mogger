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
var Mogger = require('../src/mogger'),
		fakeConsole = require('./fake-console'),
		tracer
;

describe('SurrogateTargets', function(){


	var someObj = {
		addNumbers: function (arg1, arg2) {
			return arg1 + arg2;
		},
		justReturn: function (arg1) {
			return arg1;
		}
	};

	beforeEach(function(){
		tracer = new Mogger({
			defaultConsole: fakeConsole
		});
		fakeConsole.logRecorder = [];
    });

	afterEach(function(){
		tracer.removeAllTraces();
    });

	/*
		------------------------------------------------------------------------------------
		# Targets Surrogates
		------------------------------------------------------------------------------------
	*/
	it('global surrogateTargets allow strings to define local targets', function () {
		var surrogateTargetsSource = [{

			// we can find the object to trace by its title
			title: 'someObj',

			// this is the real object that we want to trace
			target: someObj

		}];

		tracer = new Mogger({
			defaultConsole: fakeConsole,
			surrogateTargets: surrogateTargetsSource
		});

		tracer.traceObj({
			target: 'someObj'
		});

		someObj.addNumbers(1, 2);

		assert.equal(1, fakeConsole.logRecorder.length);
		assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
	});

	it('surrogateTargets can have multiples targets', function () {
		var someObj2 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
		var someObj3 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };

		var surrogateTargetsSource = [
			{ title: 'someObj' , target: someObj  },
			{ title: 'someObj2', target: someObj2 },
			{ title: 'someObj3', target: someObj3 }
		];

		tracer = new Mogger({
			defaultConsole: fakeConsole,
			surrogateTargets: surrogateTargetsSource
		});

		tracer.traceObj({ target: 'someObj'	 });
		tracer.traceObj({ target: 'someObj2' });
		tracer.traceObj({ target: 'someObj3' });

		someObj.addNumbers(1, 2);
		someObj2.addNumbers(1, 2);
		someObj3.addNumbers(1, 2);

		assert.equal(3, fakeConsole.logRecorder.length);
		assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
	});

});
