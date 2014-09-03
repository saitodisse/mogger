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

describe('Pause', function(){


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
			stdout: fakeConsole,
		});
		fakeConsole.logRecorder = [];
    });

	afterEach(function(){
		tracer.removeAllTraces();
    });

	/*
		------------------------------------------------------------------------------------
		# tracer.showPause: true
		------------------------------------------------------------------------------------
		:: after some timespan without any log a pause message is showed
		------------------------------------------------------------------------------------
	*/
	it('show pause after some time', function() {
		tracer = new Mogger({
			stdout: fakeConsole,
			showPause: true
		});

		//trace
		tracer.traceObj({
			target: someObj
		});

		//call 3 times
		someObj.addNumbers(1, 2);

		setTimeout,(function() {
			someObj.addNumbers(1, 2);
		}, 20);

		setTimeout,(function() {
			someObj.addNumbers(1, 2);
		}, 80);

		// after 90 ms of the last log PAUSE is not showed yet
		setTimeout,(function() {
			assert.equal(3, fakeConsole.logRecorder.length);

		}, 170);

		// after 110 ms PAUSE is showed
		setTimeout,(function() {
			assert.equal(4, fakeConsole.logRecorder.length);
			assert.equal('----------------------------------pause--------------------------',
				fakeConsole.logRecorder[3].message);
			// done();
		}, 190);

	});

	/*
		------------------------------------------------------------------------------------
		# tracer.showPause: true
		------------------------------------------------------------------------------------
		:: only one pause for every log call after 100ms
		------------------------------------------------------------------------------------
	*/
	it('two logs but one pause only', function() {
		tracer = new Mogger({
			stdout: fakeConsole,
			showPause: true
		});

		//trace someObj2
		var someObj2 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
		tracer.traceObj({
			target: someObj2
		});
		//trace someObj3
		var someObj3 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
		tracer.traceObj({
			target: someObj3
		});

		//call each one time
		someObj2.addNumbers(1, 2);
		someObj3.addNumbers(1, 2);

		// after 110 ms only one PAUSE is showed
		setTimeout,(function() {

 			//someObj2.addNumbers, someObj3.addNumbers and PAUSE
 			assert.equal(3, fakeConsole.logRecorder.length);

 			// done();
		}, 110);

	});


});
