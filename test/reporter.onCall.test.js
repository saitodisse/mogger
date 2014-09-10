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
    sinon           = require('sinon'),
    Reporter        = require('../src/reporter'),
    fakeConsole     = require('./fake-console'),
    _               = require('lodash'),
    defaultConfig = require('../src/default-config'),
    reporter
;

describe('Reporter OnCall:', function(){

    var defaultGlobalConfig = {};

    beforeEach(function(){
        fakeConsole.logRecorder = [];

        _.merge(defaultGlobalConfig, defaultConfig);
        _.merge(defaultGlobalConfig, { defaultConsole: fakeConsole });

        reporter = new Reporter({
            globalConfig: defaultGlobalConfig
        });
    });

    afterEach(function(){
    });

    it('when disabled returns false', function() {
        reporter = new Reporter({
            globalConfig: defaultGlobalConfig,
            localConfig: {
                defaultConsole: fakeConsole,
                enabled: false
            }
        });

        assert.equal(false, reporter.onCall({}));
    });

    it('when ignored returns false', function() {

       reporter = new Reporter({
            globalConfig: defaultGlobalConfig,
            localConfig: {
                ignoreRegexPattern: /someMethod/i
            }
        });

        // stub info
        var info = sinon.stub({
            method: 'someMethod',
            args: ['arg1', 'arg2']
        });

        assert.equal(false, reporter.onCall( info ));

    });

    it('showPause will render a pause', function(done) {

        var pauseCallBack = function() {
            assert.equal(1, fakeConsole.logRecorder.length);
            assert.equal('----------------------------------pause--------------------------',
                fakeConsole.logRecorder[0].message);
            done();
        };

        reporter = new Reporter({
            globalConfig: defaultGlobalConfig,
            localConfig: {
                defaultConsole: fakeConsole,
                waitForPause: 0,
                showPause: true,
                pauseCallBack: pauseCallBack
            }
        });

        // mock render logs
        reporter.renderLogs = function() {};


        reporter.onCall();
    });

    it('showPause will be ignored if showPause is false', function(done) {

        var pauseCallBack = function() {
            done('pauseCallBack should not have been called');
        };

        reporter = new Reporter({
            globalConfig: defaultGlobalConfig,
            localConfig: {
                defaultConsole: fakeConsole,
                waitForPause: 0,
                showPause: false,
                pauseCallBack: pauseCallBack
            }
        });

        // mock render logs
        reporter.renderLogs = function() {};

        reporter.onCall();
        done();
    });

});
