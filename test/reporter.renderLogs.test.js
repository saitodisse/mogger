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
    helpers         = require('../src/helpers'),
    defaultConfig = require('../src/default-config'),
    reporter
;

describe('Reporter OnCall:', function(){

    var defaultGlobalConfig;

    beforeEach(function(){
        fakeConsole.logRecorder = [];
        defaultGlobalConfig = helpers.merge(defaultConfig, { defaultConsole: fakeConsole });
        reporter = new Reporter(defaultGlobalConfig);
    });

    afterEach(function(){
    });

    it('_addTitle()', function() {
        var beforeConfig = {
            message: 'before message:',
            logType: 'log'
        };

        reporter = new Reporter({
            before: beforeConfig
        });

        reporter._addTitle();

        assert.deepEqual(beforeConfig, reporter.logs[0]);
    });

});
