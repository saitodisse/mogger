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

		tracer.traceObj(someObj);

		someObj.addNumbers(1, 2);

		test.equal('addNumbers', fakeConsole.logRecorder[0].message);
		
		test.done();
	},

	'can customize the trace log message': function(test) {
		var someObj = {};
		someObj.addNumbers = function (arg1, arg2) {
			return arg1 + arg2;
		};

		tracer.configure({
			beforeFunction: '=> ',
			afterFunction: ' <='
		});

		tracer.traceObj(someObj);

		someObj.addNumbers(1, 2);

		test.equal('=> addNumbers <=', fakeConsole.logRecorder[0].message);
		
		test.done();
	},

	'can call colorLogger with a CSS': function(test) {
		var someObj = {};
		someObj.addNumbers = function (arg1, arg2) {
			return arg1 + arg2;
		};

		tracer.configure({
			cssFunction: 'color: red'
		});

		tracer.traceObj(someObj);

		someObj.addNumbers(1, 2);

		test.equal('%caddNumbers', fakeConsole.logRecorder[0].message);
		test.equal('color: red', fakeConsole.logRecorder[0].cssList[0]);
		
		test.done();
	},

};
