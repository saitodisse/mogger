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
    Reporter        = require('../src/reporter'),
    ColorfulLogger  = require('colorful-logger')
;

describe('Reporter Creation:', function(){

    it('\'Reporter\' is a function', function() {
        assert.equal('function', typeof Reporter);
    });

    it('default defaultConsole is console.log', function() {
        var reporter = new Reporter({
            defaultConsole: console
        });

        assert.equal(console, reporter.defaultConsole);
    });

    it('defaultConsole is interchangeable', function() {
        var otherLoggerOutputFunction = function() {};
        var reporter = new Reporter({
            defaultConsole: otherLoggerOutputFunction
        });

        assert.notEqual(console, reporter.defaultConsole);
    });

    it('\'ColorfulLogger\' is the default logger', function() {
        var reporter = new Reporter();
        assert.equal(ColorfulLogger.Logger, reporter.Logger);
    });

});
