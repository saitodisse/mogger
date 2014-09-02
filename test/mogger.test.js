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

describe('Mogger', function(){


	var someObj = {
		addNumbers: function (arg1, arg2) {
			return arg1 + arg2;
		},
		justReturn: function (arg1) {
			return arg1;
		}
	};

	beforeEach(function(){
		tracer = new Mogger.Tracer({
			loggerConfig: {
				output: fakeConsole
			}
		});
		fakeConsole.logRecorder = [];
    });

	afterEach(function(){
		tracer.removeAllTraces();
    });

	it('Tracer constructor must exist', function() {
		assert.equal('function', typeof Mogger.Tracer);
		assert.equal('object', typeof tracer);
		assert.equal('function', typeof tracer.traceObj);
	});

	it('ColorfulLogger dependency exists', function() {
		assert.notEqual('undefined', typeof tracer.logger);
	});

	it('can use other logger dependencies', function() {
		var someLogger = {name: 'someLogger'};

		tracer = new Mogger.Tracer({
			logger: someLogger
		});

		assert.equal(someLogger, tracer.logger);
	});

	/*
		------------------------------------------------------------------------------------
		# traceObj({ target: someObj });
		------------------------------------------------------------------------------------
		:: each function that is called in someObj will generate a log output
		------------------------------------------------------------------------------------
	*/
	it('can trace a function', function() {
		tracer.traceObj({
			target: someObj
		});

		someObj.addNumbers(1, 2);

		assert.equal('addNumbers', fakeConsole.logRecorder[0].message);


	});

	/*
		------------------------------------------------------------------------------------
		# traceObj({ target: someObj });
		------------------------------------------------------------------------------------
		:: regex filters can be applied to meld
		------------------------------------------------------------------------------------
	*/
	it('trace only functions that I want', function() {
		tracer.traceObj({
			target: someObj,
			pointcut: /addNumbers/
		});

		someObj.justReturn(1, 2);
		someObj.addNumbers(1, 2);

		assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
		assert.equal(true, fakeConsole.logRecorder.length === 1);
	});

	/*
		------------------------------------------------------------------------------------
		# trace.targets === []
		------------------------------------------------------------------------------------
		:: each logged function will be stored in targets array
		------------------------------------------------------------------------------------
	*/
	it('store each traced function on targets', function() {

		//trace someObj1
		tracer.traceObj({ target: someObj	});

		//trace someObj2
		var someObj2 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
		tracer.traceObj({ target: someObj2 });

		//trace someObj3
		var someObj3 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
		tracer.traceObj({ target: someObj3 });

		assert.equal(3, tracer.targets.length);
	});

	/*
		------------------------------------------------------------------------------------
		# Global: disable and enable
		------------------------------------------------------------------------------------
	*/
	it('global disabled', function() {
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

		assert.equal(0, fakeConsole.logRecorder.length);
	});

	/*
		------------------------------------------------------------------------------------
		# Global: disable and enable after initialization
		------------------------------------------------------------------------------------
	*/
	it('global disabled after', function() {
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
		# tracer.showPause: true
		------------------------------------------------------------------------------------
		:: after some timespan without any log a pause message is showed
		------------------------------------------------------------------------------------
	*/
	it('show pause after some time', function() {
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

		// after 110 ms only one PAUSE is showed
		setTimeout,(function() {

 			//someObj2.addNumbers, someObj3.addNumbers and PAUSE
 			assert.equal(3, fakeConsole.logRecorder.length);

 			// done();
		}, 110);

	});


	/*
		------------------------------------------------------------------------------------
		# tracer.ignorePattern
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
			ignorePattern: /^ignore.*/i
		});

		//call each one time
		someObj.addNumbers(1, 2);
		someObj.ignoredFunction(1, 2);
		someObj.addNumbers(1, 2);
		someObj.ignoredFunction(1, 2);

		//someObj.addNumbers and someObj.addNumbers again
		assert.equal(2, fakeConsole.logRecorder.length);
	});


	/*
		------------------------------------------------------------------------------------
		# interceptors
		------------------------------------------------------------------------------------
		:: interceptors can modify the way that log is printed
		------------------------------------------------------------------------------------
	*/
	it('interceptors will log arguments', function() {
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
		assert.equal(2, fakeConsole.logRecorder.length);
		assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
		assert.equal('otherFunction(1, 2)', fakeConsole.logRecorder[1].message);
	});

	/*
		------------------------------------------------------------------------------------
		# global interceptors
		------------------------------------------------------------------------------------
		:: global interceptors can modify the way that all logs are printed
		------------------------------------------------------------------------------------
	*/
	it('global interceptors', function() {
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
		assert.equal(2, fakeConsole.logRecorder.length);
		assert.equal('addNumbers(1, 2)', fakeConsole.logRecorder[0].message);
		assert.equal('otherFunction(1, 2)', fakeConsole.logRecorder[1].message);
	});

	/*
		------------------------------------------------------------------------------------
		# global interceptors vs local interceptors
		------------------------------------------------------------------------------------
		:: global interceptors can modify the way that all logs are printed
		------------------------------------------------------------------------------------
	*/
	it('local interceptors wins/overlaps global interceptors', function() {
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
		assert.equal(2, fakeConsole.logRecorder.length);
		assert.equal('addNumbers(1, 2)', fakeConsole.logRecorder[0].message);
		assert.equal('->otherFunction', fakeConsole.logRecorder[1].message);
	});


	/*
		------------------------------------------------------------------------------------
		# many interceptors
		------------------------------------------------------------------------------------
	*/
	it('several interceptors can be configured', function() {
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
		assert.equal(3, fakeConsole.logRecorder.length);
		assert.equal('[1] aFunc', fakeConsole.logRecorder[0].message);
		assert.equal('[2.2] bFunc', fakeConsole.logRecorder[1].message);
		assert.equal('[3] cFunc', fakeConsole.logRecorder[2].message);
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

		assert.equal(1, fakeConsole.logRecorder.length);
		assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
	});

});
