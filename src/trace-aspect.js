var meld = require('meld');
var depth, padding;

// Call stack depth tracking for the default reporter
depth = 0;

// Padding characters for indenting traces. This will get expanded as needed
padding =  '................................';

/**
 * Creates an aspect that traces method/function calls and reports them
 * to the supplied reporter.
 * @param {object} [reporter] optional reporting API to which method call/return/throw
 *  info will be reported
 * @param {function} [reporter.onCall] invoked when a method has been called
 * @param {function} [reporter.onReturn] invoked when a method returns successfully
 * @param {function} [reporter.onThrow] invoked when a method throws an exception
 * @return {object} a tracing aspect that can be added with meld.add
 */
module.exports = function createTraceAspect(reporter, joinpoint) {

	if(!joinpoint){
		joinpoint = meld.joinpoint;
	}

	return {
		before: function() {
			var jp = joinpoint();
			reporter.onCall && reporter.onCall({ method: jp.method, target: jp.target, args: jp.args.slice() });
		},

		afterReturning: function(result) {
			var jp = joinpoint();
			reporter.onReturn && reporter.onReturn({ method: jp.method, target: jp.target, result: result });
		},

		afterThrowing: function(exception) {
			var jp = joinpoint();
			reporter.onThrow && reporter.onThrow({ method: jp.method, target: jp.target, exception: exception });
		}
	};
};
