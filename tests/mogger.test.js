var Mogger = require('../src/mogger');
var fakeConsole = require('./fake-console');
var tracer = new Mogger.Tracer({
	output: fakeConsole
});

module.exports = {
	setUp: function (callback) {
		
		var loogerConfig = {};
		loogerConfig.output = fakeConsole;

		tracer = new Mogger.Tracer({
			loggerConfig: loogerConfig
		});

		fakeConsole.logRecorder = [];

		callback();
	},
	
	tearDown: function (callback) {
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

	'can trace a function': function(test) {
		var someObj = {};
		someObj.addNumbers = function (arg1, arg2) {
			return arg1 + arg2;
		};

		tracer.traceObj({
			target: someObj
		});

		someObj.addNumbers(1, 2);

		test.equal('addNumbers', fakeConsole.logRecorder[0].message);
		
		test.done();
	},

	'can add a customized beforeFunction': function(test) {
		var someObj = {};
		someObj.addNumbers = function (arg1, arg2) {
			return arg1 + arg2;
		};

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
		test.equal('%cSomeObj   %caddNumbers     ', fakeConsole.logRecorder[0].message);
		test.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);
		test.equal('color: red', fakeConsole.logRecorder[0].cssList[1]);
		
		test.done();
	},

};
