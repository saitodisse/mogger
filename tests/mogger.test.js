var Mogger = require('../src/mogger');
var fakeConsole = require('./fake-console');
var tracer = new Mogger.Tracer({
	output: fakeConsole
});

module.exports = {
	setUp: function (callback) {
		tracer = new Mogger.Tracer({
			output: fakeConsole
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
		test.equal('function', typeof tracer.trace);
		
		test.done();
	},

	'Colorful Logger dependency': function(test) {
		test.notEqual('undefined', typeof tracer.logger);
		
		test.done();
	},

};