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

module.exports = {
	setUp: function (callback) {

		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			}
		});

		fakeConsole.logRecorder = [];

		callback();
	},
	
	tearDown: function (callback) {
		tracer.removeMeld();
		callback();
	},

	'Mogger object': function(test) {
		test.equal('function', typeof Mogger.Tracer);
		test.equal('object', typeof tracer);
		test.equal('function', typeof tracer.traceObj);
		
		test.done();
	},

	'dependency ColorfulLogger exists': function(test) {
		test.notEqual('undefined', typeof tracer.logger);
		
		test.done();
	},

	'can use other logger dependencie': function(test) {
		var someLogger = {name: 'someLogger'};

		tracer = new Mogger.Tracer({
			logger: someLogger
		});

		test.equal(someLogger, tracer.logger);
		
		test.done();
	},

	/*
		------------------------------------------------------------------------------------
		# traceObj({ target: someObj });
		------------------------------------------------------------------------------------
		:: each function that is called in someObj will generate a log output
		------------------------------------------------------------------------------------
	*/
	'can trace a function': function(test) {
		tracer.traceObj({
			target: someObj
		});

		someObj.addNumbers(1, 2);

		test.equal('addNumbers', fakeConsole.logRecorder[0].message);
		
		test.done();
	},

	/*
		------------------------------------------------------------------------------------
		# before: {LOG}
		------------------------------------------------------------------------------------
		:: put a namespace or 'class' name here, for better visualization
		------------------------------------------------------------------------------------
	*/
	'can add a customized beforeFunction': function(test) {
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
		test.equal(1, fakeConsole.logRecorder.length);

		test.equal('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		test.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		test.equal('color: red', fakeConsole.logRecorder[0].cssList[1]);
		
		test.done();
	},

	/*
		------------------------------------------------------------------------------------
		# traceObj.showArguments: true
		------------------------------------------------------------------------------------
		:: make a group and put all arguments inside
		------------------------------------------------------------------------------------
	*/
	'show arguments inside a group': function(test) {
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
		test.equal(3, fakeConsole.logRecorder.length);
		//(0) => groupCollapsed
		test.equal('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		test.equal('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		test.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		test.equal('color: red', fakeConsole.logRecorder[0].cssList[1]);
		//(1) => log
		test.equal('log', fakeConsole.logRecorder[1].methodName);
		test.equal(1, fakeConsole.logRecorder[1].message[0]);
		test.equal(2, fakeConsole.logRecorder[1].message[1]);
		//(2) => groupEnd
		test.equal('groupEnd', fakeConsole.logRecorder[2].methodName);
		
		test.done();
	},

	/*
		------------------------------------------------------------------------------------
		# tracer.showPause: true
		------------------------------------------------------------------------------------
		:: after some timespan without any log a pause message is sent
		------------------------------------------------------------------------------------
	*/
	'show time spent when a pause ocours': function(test) {
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},
			showPause: true
		});
		fakeConsole.logRecorder = [];

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

		// after 90ms and is not yet seen any PAUSE
		setTimeout(function() {
			test.equal(3, fakeConsole.logRecorder.length);
			test.done();
		}, 170);

		// after 110ms PAUSE is showed
		setTimeout(function() {
			test.equal(4, fakeConsole.logRecorder.length);
			test.equal('----------------------------------pause--------------------------',
								 fakeConsole.logRecorder[3].message);
			test.done();
		}, 190);

	},

};
