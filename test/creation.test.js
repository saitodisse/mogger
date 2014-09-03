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

describe('Creation', function(){

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


});
