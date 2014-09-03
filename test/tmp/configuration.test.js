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

describe('Configuration', function(){


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
			stdout: fakeConsole
		});
		fakeConsole.logRecorder = [];
    });

	afterEach(function(){
		tracer.removeAllTraces();
    });

	/*
		------------------------------------------------------------------------------------
		# Global: disable and enable
		------------------------------------------------------------------------------------
	*/
	it('global disabled', function() {
		tracer = new Mogger({
			stdout: fakeConsole,
			enabled: false
		});

		tracer.traceObj({
			target: someObj
		});

		someObj.addNumbers(1, 2);

		assert.equal(0, fakeConsole.logRecorder.length);
	});

	/*
		------------------------------------------------------------------------------------
		# Global: disable and enable after initialization
		------------------------------------------------------------------------------------
	*/
	it('global disabled after', function() {
		tracer = new Mogger({
			stdout: fakeConsole,
		});

		// --------------------------------------------
		// disabling before traceObj
		tracer.globalConfig.enabled = false;

		tracer.traceObj({ target: someObj });

		someObj.addNumbers(1, 2);
		assert.equal(0, fakeConsole.logRecorder.length);
		// --------------------------------------------


		// --------------------------------------------
		// enabling after traceObj
		tracer.globalConfig.enabled = true;

		someObj.addNumbers(1, 2);
		assert.equal(1, fakeConsole.logRecorder.length);
		// --------------------------------------------
	});

	/*
		------------------------------------------------------------------------------------
		# Local: disable and enable
		------------------------------------------------------------------------------------
	*/
	it('local disabled', function() {
		tracer.traceObj({
			target: someObj,
			enabled: false
		});

		someObj.addNumbers(1, 2);

		assert.equal(0, fakeConsole.logRecorder.length);
	});

	/*
		------------------------------------------------------------------------------------
		# before: {LOG}
		------------------------------------------------------------------------------------
		:: put a name-space or 'class' name here, for better visualization
		------------------------------------------------------------------------------------
	*/
	it('can add a customized beforeFunction', function() {
		//trace
		tracer.traceObj({
			target: someObj,
			targetConfig: {
				css: 'color: red',
				size: 15
			},

			before: {
				message: 'SomeObj',
				css: 'color: blue',
				size: 10
			}

		});

		//call
		someObj.addNumbers(1, 2);

		//verify
		assert.equal(1, fakeConsole.logRecorder.length);

		assert.equal('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		assert.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		assert.equal('color: red', fakeConsole.logRecorder[0].cssList[1]);


	});


	/*
		------------------------------------------------------------------------------------
		# global.before
		------------------------------------------------------------------------------------
		:: local configuration is high priority. Will merge with global.
		------------------------------------------------------------------------------------
	*/
	it('global configurations for css and size', function() {

		tracer = new Mogger({
			stdout: fakeConsole,

			/////////////////////////
			// global targetConfig
			targetConfig: {
				css: 'color: red',
				size: 15
			},

			/////////////////////////
			// global before
			before: {
				css: 'color: blue',
				size: 10
			},

			/////////////////////////
			// global showArguments
			showArguments: true
		});

		//trace
		tracer.traceObj({
			target: someObj,
			before: {
				message: 'SomeObj'
			},

		});

		//call
		someObj.addNumbers(1, 2);

		//verify
		assert.equal(3, fakeConsole.logRecorder.length);

		assert.equal('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		assert.equal('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		assert.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		assert.equal('color: red', fakeConsole.logRecorder[0].cssList[1]);


	});

	/*
		------------------------------------------------------------------------------------
		# traceObj.showArguments: true
		------------------------------------------------------------------------------------
		:: make a group and put all arguments inside
		------------------------------------------------------------------------------------
	*/
	it('show arguments inside a group', function() {
		//trace
		tracer.traceObj({
			target: someObj,
			targetConfig: {
				css: 'color: red',
				size: 15
			},

			before: {
				message: 'SomeObj',
				css: 'color: blue',
				size: 10
			},

			showArguments: true

		});

		//call
		someObj.addNumbers(1, 2);

		//verify
		assert.equal(3, fakeConsole.logRecorder.length);
		//(0) => groupCollapsed
		assert.equal('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		assert.equal('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		assert.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		assert.equal('color: red', fakeConsole.logRecorder[0].cssList[1]);
		//(1) => log
		assert.equal('log', fakeConsole.logRecorder[1].methodName);
		assert.equal(1, fakeConsole.logRecorder[1].message[0]);
		assert.equal(2, fakeConsole.logRecorder[1].message[1]);
		//(2) => groupEnd
		assert.equal('groupEnd', fakeConsole.logRecorder[2].methodName);


	});


	/*
		------------------------------------------------------------------------------------
		# checkRelevantArguments()
		------------------------------------------------------------------------------------
	*/
	it('only show relevant arguments', function() {
		//trace
		tracer.traceObj({
			target: someObj,
			targetConfig: {
				css: 'color: red',
				size: 15
			},

			before: {
				message: 'SomeObj',
				css: 'color: blue',
				size: 10
			},

			showArguments: true

		});

		var totalLogs = 0;

		//call
		someObj.addNumbers(1);
		//verify 'Show Arguments = True'
		totalLogs += 3;
		assert.equal('groupCollapsed', 	fakeConsole.logRecorder[totalLogs-3].methodName);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-2].methodName);
		assert.equal('groupEnd', 				fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers();
		//verify 'Show Arguments = False'
		totalLogs += 1;
		assert.equal(totalLogs, fakeConsole.logRecorder.length);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers([]);
		//verify 'Show Arguments = False'
		totalLogs += 1;
		assert.equal(totalLogs, fakeConsole.logRecorder.length);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers([1]);
		//verify 'Show Arguments = True'
		totalLogs += 3;
		assert.equal('groupCollapsed', 	fakeConsole.logRecorder[totalLogs-3].methodName);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-2].methodName);
		assert.equal('groupEnd', 				fakeConsole.logRecorder[totalLogs-1].methodName);


		assert.equal(totalLogs, fakeConsole.logRecorder.length);

		//call
		someObj.addNumbers('');
		//verify 'Show Arguments = False'
		totalLogs += 1;
		assert.equal(totalLogs, fakeConsole.logRecorder.length);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers('ABC');
		//verify 'Show Arguments = False'
		totalLogs += 3;
		assert.equal('groupCollapsed', 	fakeConsole.logRecorder[totalLogs-3].methodName);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-2].methodName);
		assert.equal('groupEnd', 				fakeConsole.logRecorder[totalLogs-1].methodName);


		assert.equal(totalLogs, fakeConsole.logRecorder.length);

		//call
		someObj.addNumbers({});
		//verify 'Show Arguments = False'
		totalLogs += 1;
		assert.equal(totalLogs, fakeConsole.logRecorder.length);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers({a: 1});
		//verify 'Show Arguments = True'
		totalLogs += 3;
		assert.equal('groupCollapsed', 	fakeConsole.logRecorder[totalLogs-3].methodName);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-2].methodName);
		assert.equal('groupEnd', 				fakeConsole.logRecorder[totalLogs-1].methodName);


		assert.equal(totalLogs, fakeConsole.logRecorder.length);

		//call
		someObj.addNumbers( (function(){}) );
		//verify 'Show Arguments = False'
		totalLogs += 1;
		assert.equal(totalLogs, fakeConsole.logRecorder.length);
		assert.equal('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);
	});

	/*
		------------------------------------------------------------------------------------
		# tracer.ignoreRegexPattern
		------------------------------------------------------------------------------------
		:: do not log any ignored regex pattern
		------------------------------------------------------------------------------------
	*/
	it('will not log every function that starts with /ignore/', function() {
		//trace someObj3
		var someObj = {
			addNumbers: function (arg1, arg2) { return arg1 + arg2; },
			ignoredFunction: function (arg1, arg2) { return arg1 + arg2; }
		};

		//trace
		tracer.traceObj({
			target: someObj,
			ignoreRegexPattern: /^ignore.*/i
		});

		//call each one time
		someObj.addNumbers(1, 2);
		someObj.ignoredFunction(1, 2);
		someObj.addNumbers(1, 2);
		someObj.ignoredFunction(1, 2);

		//someObj.addNumbers and someObj.addNumbers again
		assert.equal(2, fakeConsole.logRecorder.length);
	});


});
