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


var assert      = require('assert'),
    sinon       = require('sinon'),
    Mogger      = require('../src/mogger'),
    fakeConsole = require('./fake-console'),
    mogger
;

var expectError = function(fn, message){
    assert.throws(function() {
        fn();
    },function(err) {
    assert.equal(message, err.message);
        return true;
    });
};

describe('Mogger.traceObj:', function(){

    beforeEach(function(){
        mogger = new Mogger({
            defaultConsole: fakeConsole
        });
        fakeConsole.logRecorder = [];
    });

    afterEach(function(){
        mogger.removeAllTraces();
        mogger.surrogateTargets = null;
    });

    it('_createReporter()', function () {
        mogger = new Mogger({
            defaultConsole: fakeConsole
        });

        var reporter = mogger._createReporter({});

        assert.equal(true, reporter.enabled);
    });

    it('_selectTargetFromSurrogateTargets() surrogateTargets can\'t be empty', function () {

        expectError(function() {

            mogger = new Mogger({
                defaultConsole: fakeConsole
            });

            mogger.surrogateTargets = null;
            mogger._targetTitle = 'someObj';
            mogger._selectTargetFromSurrogateTargets();

        }, 'surrogateTargets can\'t be empty');

    });

    it('_selectTargetFromSurrogateTargets() the target must be a string', function () {

        expectError(function() {

            mogger = new Mogger({
                defaultConsole: fakeConsole,
                surrogateTargets: [{title: 'someObj2', target: {} }]
            });

            mogger._selectTargetFromSurrogateTargets();

        }, 'the targetTitle must be a string');

    });

    it('_selectTargetFromSurrogateTargets() selects a target', function () {

        var someObj2 = {someMethod: function() {}};
        var surrogateTargetItem = {title: 'someObj2', target: someObj2 };

        mogger = new Mogger({
            defaultConsole: fakeConsole
        });

        mogger.surrogateTargets = [surrogateTargetItem];

        mogger._targetTitle = 'someObj2';
        var selected = mogger._selectTargetFromSurrogateTargets();

        assert.deepEqual(selected, surrogateTargetItem);
    });

    it('_trace() adds a target to _targets', function () {
        var someObj2 = { someMethod: function() {} };
        var surrogateTargetItem = {title: 'someObj2', target: someObj2 };

        mogger._trace(surrogateTargetItem, /./, null);

        assert.equal(1, mogger._targets.length);
    });

    it('traceObj() must have options', function () {

        mogger = new Mogger({
            surrogateTargets: []
        });

        mogger._selectTargetFromSurrogateTargets = sinon.spy();
        mogger._createReporter = sinon.spy();
        mogger._trace = sinon.spy();

        expectError(function() {

            mogger.traceObj();

        }, 'you must provide options on traceObj');
    });

    it('traceObj() must have a string target', function () {

        mogger = new Mogger({
            surrogateTargets: []
        });
        mogger._selectTargetFromSurrogateTargets = sinon.spy();
        mogger._createReporter = sinon.spy();
        mogger._trace = sinon.spy();

        expectError(function() {

            mogger.traceObj({targetTitle: {}});

        }, 'localOptions.targetTitle must be a string');
    });

    it('traceObj()', function () {

        mogger = new Mogger({
            surrogateTargets: []
        });
        mogger._selectTargetFromSurrogateTargets = sinon.spy();
        mogger._createReporter = sinon.spy();
        mogger._trace = sinon.spy();

        mogger.traceObj({targetTitle: 'someTarget'});

        assert.equal(true, mogger._selectTargetFromSurrogateTargets.called);
        assert.equal(true, mogger._createReporter.called);
        assert.equal(true, mogger._trace.called);

    });

});
