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

var buster = require("buster");

var Mogger = require('../src/mogger');
var fakeConsole = require('./fake-console');
var tracer = new Mogger.Tracer({
	output: fakeConsole
});

var someObj = {
	addNumbers: function (arg1, arg2) {
		return arg1 + arg2;
	}
};

var testCase = buster.testCase("Mogger", {
  setUp: function () {
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			}
		});
		fakeConsole.logRecorder = [];
	},

	tearDown: function () {
		tracer.removeMeld();
	},

	'contructor': function() {
		buster.assert.equals('function', typeof Mogger.Tracer);
		buster.assert.equals('object', typeof tracer);
		buster.assert.equals('function', typeof tracer.traceObj);
	},

	'dependency ColorfulLogger exists': function() {
		buster.refute.equals('undefined', typeof tracer.logger);
	},

	'can use other logger dependencie': function() {
		var someLogger = {name: 'someLogger'};

		tracer = new Mogger.Tracer({
			logger: someLogger
		});

		buster.assert.equals(someLogger, tracer.logger);
	},

	/*
		------------------------------------------------------------------------------------
		# traceObj({ target: someObj });
		------------------------------------------------------------------------------------
		:: each function that is called in someObj will generate a log output
		------------------------------------------------------------------------------------
	*/
	'can trace a function': function() {
		tracer.traceObj({
			target: someObj
		});

		someObj.addNumbers(1, 2);

		buster.assert.equals('addNumbers', fakeConsole.logRecorder[0].message);
		
		
	},

	/*
		------------------------------------------------------------------------------------
		# before: {LOG}
		------------------------------------------------------------------------------------
		:: put a namespace or 'class' name here, for better visualization
		------------------------------------------------------------------------------------
	*/
	'can add a customized beforeFunction': function() {
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
			
		});

		//call
		someObj.addNumbers(1, 2);

		//verify
		buster.assert.equals(1, fakeConsole.logRecorder.length);

		buster.assert.equals('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		buster.assert.equals('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		buster.assert.equals('color: red', fakeConsole.logRecorder[0].cssList[1]);
		
		
	},

	/*
		------------------------------------------------------------------------------------
		# traceObj.showArguments: true
		------------------------------------------------------------------------------------
		:: make a group and put all arguments inside
		------------------------------------------------------------------------------------
	*/
	'show arguments inside a group': function() {
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
		buster.assert.equals(3, fakeConsole.logRecorder.length);
		//(0) => groupCollapsed
		buster.assert.equals('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		buster.assert.equals('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		buster.assert.equals('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		buster.assert.equals('color: red', fakeConsole.logRecorder[0].cssList[1]);
		//(1) => log
		buster.assert.equals('log', fakeConsole.logRecorder[1].methodName);
		buster.assert.equals(1, fakeConsole.logRecorder[1].message[0]);
		buster.assert.equals(2, fakeConsole.logRecorder[1].message[1]);
		//(2) => groupEnd
		buster.assert.equals('groupEnd', fakeConsole.logRecorder[2].methodName);
		
		
	},

	/*
		------------------------------------------------------------------------------------
		# tracer.showPause: true
		------------------------------------------------------------------------------------
		:: after some timespan without any log a pause message is showed
		------------------------------------------------------------------------------------
	*/
	'show pause after some time': function(done) {
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},
			showPause: true
		});

		//trace
		tracer.traceObj({
			target: someObj			
		});

		//call 3 times
		someObj.addNumbers(1, 2);

		setTimeout(function() {
			someObj.addNumbers(1, 2);
		}, 20);

		setTimeout(function() {
			someObj.addNumbers(1, 2);
		}, 80);

		// after 90ms of the last log PAUSE is not showed yet
		setTimeout(function() {
			buster.assert.equals(3, fakeConsole.logRecorder.length);
			
		}, 170);

		// after 110ms PAUSE is showed
		setTimeout(function() {
			buster.assert.equals(4, fakeConsole.logRecorder.length);
			buster.assert.equals('----------------------------------pause--------------------------',
				fakeConsole.logRecorder[3].message);
			done();
		}, 190);

	},

	'two logs but one pause only': function(done) {
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},
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

		// after 110ms only one PAUSE is showed
		setTimeout(function() {
 			
 			//someObj2.addNumbers, someObj3.addNumbers and PAUSE
 			buster.assert.equals(3, fakeConsole.logRecorder.length);
 			
 			done();
		}, 110);

	},

});
