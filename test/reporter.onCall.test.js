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
    fakeConsole     = require('./fake-console'),
    sinon           = require('sinon'),
    reporter
;

describe('Reporter OnCall:', function(){

    beforeEach(function(){
        fakeConsole.logRecorder = [];
        reporter = new Reporter({
            stdout: fakeConsole
        });
    });

    afterEach(function(){
    });

    it('when disabled return false', function() {
        reporter = new Reporter({
            stdout: fakeConsole,
            enabled: false
        });
        assert.equal(false, reporter.onCall({}));
    });

    // it('before is attached to logs array', function() {
    //     var beforeConfig = {
    //         message: 'before message:',
    //         logType: 'log'
    //     };

    //     reporter = new Reporter({
    //         stdout: fakeConsole,
    //         before: beforeConfig
    //     });

    //     // stub info
    //     var info = sinon.stub({
    //         method: 'someMethod',
    //         args: ['arg1', 'arg2']
    //     });

    //     reporter.onCall(info);

    //     assert.deepEqual(beforeConfig, reporter.logs[0]);

    //     // console
    //     assert.equal(1, fakeConsole.logRecorder.length);
    //     assert.equal('before message:someMethod', fakeConsole.logRecorder[0].message);

    // });

});
