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


var assert          = require('assert'),
    _               = require('lodash'),
    Reporter        = require('../src/reporter'),
    ColorfulLogger  = require('colorful-logger')
;

describe('Reporter Creation:', function(){

    beforeEach(function(){
    });

    afterEach(function(){
    });

    it('\'Reporter\' is a function', function() {
        assert.equal('function', typeof Reporter);
    });

    it('has options', function() {
        var reporter = new Reporter();
        var hasOptions = _.has(reporter, 'options');
        assert.equal(true, hasOptions);
    });

    it('default stdout is console.log', function() {
        var reporter = new Reporter({
            stdout: console
        });

        assert.equal(console, reporter.stdout);
    });

    it('stdout is interchangeable', function() {
        var otherLoggerOutputFunction = function() {};
        var reporter = new Reporter({
            stdout: otherLoggerOutputFunction
        });

        assert.notEqual(console, reporter.stdout);
    });

    it('\'ColorfulLogger\' is the default logger', function() {
        var reporter = new Reporter();
        assert.equal(ColorfulLogger.Logger, reporter.Logger);
    });

});
