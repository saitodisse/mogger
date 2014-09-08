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
var _ = require('lodash');
var Mogger = require('../src/mogger');

describe('Creation:', function(){

    // beforeEach(function(){
    // });

    it('\'Mogger\' is a function', function() {
        assert.equal('function', typeof Mogger);
    });

    it('default defaultConsole is console.log', function() {
        var mogger = new Mogger();
        assert.equal(console, mogger.defaultConsole);
    });

    it('defaultConsole is interchangeable', function() {
        var otherLoggerOutputFunction = function() {};
        var mogger = new Mogger({
            defaultConsole: otherLoggerOutputFunction
        });
        assert.notEqual(console, mogger.defaultConsole);
    });

});
