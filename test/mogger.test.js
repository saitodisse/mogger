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

var buster = require('buster'),
		equals = buster.assert.equals,
		notEquals = buster.refute.equals
;

var Mogger = require('../src/mogger'),
		fakeConsole = require('./fake-console'),
		tracer
;

var someObj = {
	addNumbers: function (arg1, arg2) {
		return arg1 + arg2;
	},
	justReturn: function (arg1) {
		return arg1;
	}
};

buster.testCase('Mogger:', {
  setUp: function () {
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			}
		});
		fakeConsole.logRecorder = [];
	},

	tearDown: function () {
		tracer.removeAllTraces();
	},

	'contructor': function() {
		equals('function', typeof Mogger.Tracer);
		equals('object', typeof tracer);
		equals('function', typeof tracer.traceObj);
	},

	'dependency ColorfulLogger exists': function() {
		notEquals('undefined', typeof tracer.logger);
	},

	'can use other logger dependencie': function() {
		var someLogger = {name: 'someLogger'};

		tracer = new Mogger.Tracer({
			logger: someLogger
		});

		equals(someLogger, tracer.logger);
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

		equals('addNumbers', fakeConsole.logRecorder[0].message);


	},

	/*
		------------------------------------------------------------------------------------
		# traceObj({ target: someObj });
		------------------------------------------------------------------------------------
		:: regex filters can be applyed to meld
		------------------------------------------------------------------------------------
	*/
	'trace only functions that I want': function() {
		tracer.traceObj({
			target: someObj,
			pointcut: /addNumbers/
		});

		someObj.justReturn(1, 2);
		someObj.addNumbers(1, 2);

		equals('addNumbers', fakeConsole.logRecorder[0].message);
		equals(true, fakeConsole.logRecorder.length === 1);
	},

	/*
		------------------------------------------------------------------------------------
		# trace.targets === []
		------------------------------------------------------------------------------------
		:: each logged function will be stored in targets array
		------------------------------------------------------------------------------------
	*/
	'store each traced function on targets': function() {

		//trace someObj1
		tracer.traceObj({ target: someObj	});

		//trace someObj2
		var someObj2 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
		tracer.traceObj({ target: someObj2 });

		//trace someObj3
		var someObj3 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
		tracer.traceObj({ target: someObj3 });

		equals(3, tracer.targets.length);
	},

	/*
		------------------------------------------------------------------------------------
		# Global: disable and enable
		------------------------------------------------------------------------------------
	*/
	'global disabled': function(){
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},
			enabled: false
		});

		tracer.traceObj({
			target: someObj
		});

		someObj.addNumbers(1, 2);

		equals(0, fakeConsole.logRecorder.length);
	},

	/*
		------------------------------------------------------------------------------------
		# Global: disable and enable after initialization
		------------------------------------------------------------------------------------
	*/
	'global disabled after': function(){
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			}
		});

		// --------------------------------------------
		// disabling before traceObj
		tracer.globalConfig.enabled = false;

		tracer.traceObj({ target: someObj });

		someObj.addNumbers(1, 2);
		equals(0, fakeConsole.logRecorder.length);
		// --------------------------------------------


		// --------------------------------------------
		// enabling after traceObj
		tracer.globalConfig.enabled = true;

		someObj.addNumbers(1, 2);
		equals(1, fakeConsole.logRecorder.length);
		// --------------------------------------------
	},

	/*
		------------------------------------------------------------------------------------
		# Local: disable and enable
		------------------------------------------------------------------------------------
	*/
	'local disabled': function(){
		tracer.traceObj({
			target: someObj,
			enabled: false
		});

		someObj.addNumbers(1, 2);

		equals(0, fakeConsole.logRecorder.length);
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
		equals(1, fakeConsole.logRecorder.length);

		equals('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		equals('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		equals('color: red', fakeConsole.logRecorder[0].cssList[1]);


	},


	/*
		------------------------------------------------------------------------------------
		# global.before
		------------------------------------------------------------------------------------
		:: local configuration is high priority. Will merge with global.
		------------------------------------------------------------------------------------
	*/
	'global configurations for css and size': function() {

		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},

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
		equals(3, fakeConsole.logRecorder.length);

		equals('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		equals('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		equals('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		equals('color: red', fakeConsole.logRecorder[0].cssList[1]);


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
		equals(3, fakeConsole.logRecorder.length);
		//(0) => groupCollapsed
		equals('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		equals('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		equals('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		equals('color: red', fakeConsole.logRecorder[0].cssList[1]);
		//(1) => log
		equals('log', fakeConsole.logRecorder[1].methodName);
		equals(1, fakeConsole.logRecorder[1].message[0]);
		equals(2, fakeConsole.logRecorder[1].message[1]);
		//(2) => groupEnd
		equals('groupEnd', fakeConsole.logRecorder[2].methodName);


	},


	/*
		------------------------------------------------------------------------------------
		# checkRelevantArguments()
		------------------------------------------------------------------------------------
	*/
	'only show relevant arguments': function() {
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
		//verify "Show Arguments = True"
		totalLogs += 3;
		equals('groupCollapsed', 	fakeConsole.logRecorder[totalLogs-3].methodName);
		equals('log', 						fakeConsole.logRecorder[totalLogs-2].methodName);
		equals('groupEnd', 				fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers();
		//verify "Show Arguments = False"
		totalLogs += 1;
		equals(totalLogs, fakeConsole.logRecorder.length);
		equals('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers([]);
		//verify "Show Arguments = False"
		totalLogs += 1;
		equals(totalLogs, fakeConsole.logRecorder.length);
		equals('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers([1]);
		//verify "Show Arguments = True"
		totalLogs += 3;
		equals('groupCollapsed', 	fakeConsole.logRecorder[totalLogs-3].methodName);
		equals('log', 						fakeConsole.logRecorder[totalLogs-2].methodName);
		equals('groupEnd', 				fakeConsole.logRecorder[totalLogs-1].methodName);


		equals(totalLogs, fakeConsole.logRecorder.length);

		//call
		someObj.addNumbers("");
		//verify "Show Arguments = False"
		totalLogs += 1;
		equals(totalLogs, fakeConsole.logRecorder.length);
		equals('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers("ABC");
		//verify "Show Arguments = False"
		totalLogs += 3;
		equals('groupCollapsed', 	fakeConsole.logRecorder[totalLogs-3].methodName);
		equals('log', 						fakeConsole.logRecorder[totalLogs-2].methodName);
		equals('groupEnd', 				fakeConsole.logRecorder[totalLogs-1].methodName);


		equals(totalLogs, fakeConsole.logRecorder.length);

		//call
		someObj.addNumbers({});
		//verify "Show Arguments = False"
		totalLogs += 1;
		equals(totalLogs, fakeConsole.logRecorder.length);
		equals('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);

		//call
		someObj.addNumbers({a: 1});
		//verify "Show Arguments = True"
		totalLogs += 3;
		equals('groupCollapsed', 	fakeConsole.logRecorder[totalLogs-3].methodName);
		equals('log', 						fakeConsole.logRecorder[totalLogs-2].methodName);
		equals('groupEnd', 				fakeConsole.logRecorder[totalLogs-1].methodName);


		equals(totalLogs, fakeConsole.logRecorder.length);

		//call
		someObj.addNumbers( (function(){}) );
		//verify "Show Arguments = False"
		totalLogs += 1;
		equals(totalLogs, fakeConsole.logRecorder.length);
		equals('log', 						fakeConsole.logRecorder[totalLogs-1].methodName);
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
			equals(3, fakeConsole.logRecorder.length);

		}, 170);

		// after 110ms PAUSE is showed
		setTimeout(function() {
			equals(4, fakeConsole.logRecorder.length);
			equals('----------------------------------pause--------------------------',
				fakeConsole.logRecorder[3].message);
			done();
		}, 190);

	},

	/*
		------------------------------------------------------------------------------------
		# tracer.showPause: true
		------------------------------------------------------------------------------------
		:: only one pause for every log call after 100ms
		------------------------------------------------------------------------------------
	*/
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
 			equals(3, fakeConsole.logRecorder.length);

 			done();
		}, 110);

	},


	/*
		------------------------------------------------------------------------------------
		# tracer.ignorePattern
		------------------------------------------------------------------------------------
		:: do not log any ignored regex pattern
		------------------------------------------------------------------------------------
	*/
	'will not log every function that starts with /ignore/': function() {
		//trace someObj3
		var someObj = {
			addNumbers: function (arg1, arg2) { return arg1 + arg2; },
			ignoredFunction: function (arg1, arg2) { return arg1 + arg2; }
		};

		//trace
		tracer.traceObj({
			target: someObj,
			ignorePattern: /^ignore.*/i
		});

		//call each one time
		someObj.addNumbers(1, 2);
		someObj.ignoredFunction(1, 2);
		someObj.addNumbers(1, 2);
		someObj.ignoredFunction(1, 2);

		//someObj.addNumbers and someObj.addNumbers again
		equals(2, fakeConsole.logRecorder.length);
	},


	/*
		------------------------------------------------------------------------------------
		# interceptors
		------------------------------------------------------------------------------------
		:: interceptors can modify the way that log is printed
		------------------------------------------------------------------------------------
	*/
	'interceptors will log arguments': function() {
		//the object and his function
		var someObj = {
			addNumbers: function (arg1, arg2) { return arg1 + arg2; },
			otherFunction: function (arg1, arg2) { return arg1 + arg2; }
		};

		//trace
		tracer.traceObj({
			target: someObj,
			interceptors: {
				filterRegex: /otherFunction/i,
				callback: function(info) {
					return info.method + '(' + info.args[0] + ', ' + info.args[1] + ')';
				}
			}
		});

		//call each one time
		someObj.addNumbers(1, 2);
		someObj.otherFunction(1, 2);

		//someObj.addNumbers and someObj.addNumbers again
		equals(2, fakeConsole.logRecorder.length);
		equals('addNumbers', fakeConsole.logRecorder[0].message);
		equals('otherFunction(1, 2)', fakeConsole.logRecorder[1].message);
	},

	/*
		------------------------------------------------------------------------------------
		# global interceptors
		------------------------------------------------------------------------------------
		:: global interceptors can modify the way that all logs are printed
		------------------------------------------------------------------------------------
	*/
	'global interceptors': function() {
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},
			showPause: true,
			interceptors: {
				filterRegex: /.*/i,
				callback: function(info) {
					return info.method + '(' + info.args[0] + ', ' + info.args[1] + ')';
				}
			}
		});

		//the object and his function
		var someObj = {
			addNumbers: function (arg1, arg2) { return arg1 + arg2; },
			otherFunction: function (arg1, arg2) { return arg1 + arg2; }
		};

		//trace
		tracer.traceObj({
			target: someObj,
		});

		//call each one time
		someObj.addNumbers(1, 2);
		someObj.otherFunction(1, 2);

		//someObj.addNumbers and someObj.addNumbers again
		equals(2, fakeConsole.logRecorder.length);
		equals('addNumbers(1, 2)', fakeConsole.logRecorder[0].message);
		equals('otherFunction(1, 2)', fakeConsole.logRecorder[1].message);
	},

	/*
		------------------------------------------------------------------------------------
		# global interceptors vs local interceptors
		------------------------------------------------------------------------------------
		:: global interceptors can modify the way that all logs are printed
		------------------------------------------------------------------------------------
	*/
	'local interceptors wins/overlaps global interceptors': function() {
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},
			showPause: true,

			// GLOBAL INTERCEPTORS
			interceptors: {
				filterRegex: /.*/i,
				callback: function(info) {
					return '->' + info.method;
				}
			}

		});

		//the object and his function
		var someObj = {
			addNumbers: function (arg1, arg2) { return arg1 + arg2; },
			otherFunction: function (arg1, arg2) { return arg1 + arg2; }
		};

		//trace
		tracer.traceObj({
			target: someObj,

			// LOCAL INTERCEPTORS
			interceptors: {
				filterRegex: /addNumbers/i,
				callback: function(info) {
					return info.method + '(' + info.args[0] + ', ' + info.args[1] + ')';
				}
			}

		});

		//call each one time
		someObj.addNumbers(1, 2);
		someObj.otherFunction(1, 2);

		//someObj.addNumbers and someObj.addNumbers again
		equals(2, fakeConsole.logRecorder.length);
		equals('addNumbers(1, 2)', fakeConsole.logRecorder[0].message);
		equals('->otherFunction', fakeConsole.logRecorder[1].message);
	},


	/*
		------------------------------------------------------------------------------------
		# many interceptors
		------------------------------------------------------------------------------------
	*/
	'several interceptors can be configured': function() {
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},
			showPause: true,

			// GLOBAL INTERCEPTORS
			interceptors: [
			{
				filterRegex: /^a.*/i,
				callback: function(info) {
					return '[1] ' + info.method;
				}
			},
			{
				filterRegex: /^b.*/i,
				callback: function(info) {
					return '[2.1] ' + info.method;
				}
			}]

		});

		//the object and his function
		var someObj = {
			aFunc: function (arg1, arg2) { return arg1 + arg2; },
			bFunc: function (arg1, arg2) { return arg1 + arg2; },
			cFunc: function (arg1, arg2) { return arg1 + arg2; }
		};

		//trace
		tracer.traceObj({
			target: someObj,

			// LOCAL INTERCEPTORS
			interceptors: [
			{
				filterRegex: /^b.*/i,
				callback: function(info) {
					return '[2.2] ' + info.method;
				}
			},
			{
				filterRegex: /^c.*/i,
				callback: function(info) {
					return '[3] ' + info.method;
				}
			}]

		});

		//call each one time
		someObj.aFunc(1, 2);
		someObj.bFunc(1, 2);
		someObj.cFunc(1, 2);

		//someObj.addNumbers and someObj.addNumbers again
		equals(3, fakeConsole.logRecorder.length);
		equals('[1] aFunc', fakeConsole.logRecorder[0].message);
		equals('[2.2] bFunc', fakeConsole.logRecorder[1].message);
		equals('[3] cFunc', fakeConsole.logRecorder[2].message);
	},

	/*
		------------------------------------------------------------------------------------
		# Targets Surrogates
		------------------------------------------------------------------------------------
	*/
	'global surrogateTargets allow strings to define local targets': function(){
		var surrogateTargetsSource = [{

			// we can find the object to trace by its title
			title: 'someObj',

			// this is the real object that we want to trace
			target: someObj

		}];

		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			},
			surrogateTargets: surrogateTargetsSource
		});

		tracer.traceObj({
			target: 'someObj'
		});

		someObj.addNumbers(1, 2);

		equals(1, fakeConsole.logRecorder.length);
		equals('addNumbers', fakeConsole.logRecorder[0].message);
	},

});
