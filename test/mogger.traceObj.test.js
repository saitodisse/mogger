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

    // var someObj = {
    //     addNumbers: function (arg1, arg2) {
    //         return arg1 + arg2;
    //     },
    //     justReturn: function (arg1) {
    //         return arg1;
    //     }
    // };

    beforeEach(function(){
        mogger = new Mogger({
            defaultConsole: fakeConsole
        });
        fakeConsole.logRecorder = [];
    });

    afterEach(function(){
        mogger.removeAllTraces();
    });

    it('_createReporter()', function () {
        var ReporterSpy = sinon.spy();
        mogger = new Mogger({
            defaultConsole: fakeConsole,
            Reporter: ReporterSpy
        });

        mogger._createReporter({});

        assert.equal(true, ReporterSpy.calledWithNew());
    });

    it('_selectTargetFromSurrogateTargets() must be defined', function () {

        expectError(function() {

            mogger = new Mogger({
                defaultConsole: fakeConsole
            });
            mogger._target = 'someObj';
            mogger._selectTargetFromSurrogateTargets();

        }, 'cannot find target \'someObj\'');

    });

    it('_selectTargetFromSurrogateTargets() must be defined', function () {

        expectError(function() {

            mogger = new Mogger({
                defaultConsole: fakeConsole,
                surrogateTargets: [{title: 'someObj2', target: {} }]
            });

            mogger._selectTargetFromSurrogateTargets();

        }, 'the target must be a string');

    });

    it('_selectTargetFromSurrogateTargets() selects a target', function () {

        var someObj2 = {someMethod: function() {}};
        var surrogateTargetItem = {title: 'someObj2', target: someObj2 };

        mogger = new Mogger({
            defaultConsole: fakeConsole,
            surrogateTargets: [surrogateTargetItem]
        });

        mogger._target = 'someObj2';
        var selected = mogger._selectTargetFromSurrogateTargets();

        assert.deepEqual(selected, surrogateTargetItem);
    });

    it('_trace() adds a target to _targets', function () {
        var someObj2 = {someMethod: function() {}};
        var surrogateTargetItem = {title: 'someObj2', target: someObj2 };

        mogger._trace(surrogateTargetItem, /./, null);

        assert.equal(1, mogger._targets.length);
    });

    it('traceObj()', function () {

        mogger = new Mogger();
        mogger._selectTargetFromSurrogateTargets = sinon.spy();
        mogger._createReporter = sinon.spy();
        mogger._trace = sinon.spy();

        mogger.traceObj();

        assert.equal(true, mogger._selectTargetFromSurrogateTargets.called);
        assert.equal(true, mogger._createReporter.called);
        assert.equal(true, mogger._trace.called);

    });

});
