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
        var surrogateTargetItem = {title: 'someObj2', target: someObj2 }

        mogger = new Mogger({
            defaultConsole: fakeConsole,
            surrogateTargets: [surrogateTargetItem]
        });

        mogger._target = 'someObj2';
        var selected = mogger._selectTargetFromSurrogateTargets();

        assert.deepEqual(selected, surrogateTargetItem);
    });

    // it('_selectTargetFromSurrogateTargets() must be defined', function () {

    //     assert.throws(function() {
    //         mogger = new Mogger({
    //             defaultConsole: fakeConsole
    //         });
    //         mogger._selectTargetFromSurrogateTargets();
    //     }, Error, 'Error thrown');

    //     // var someObj2 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
    //     // var someObj3 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };

    //     // var surrogateTargetsSource = [
    //     //     { title: 'someObj2', target: someObj2 },
    //     //     { title: 'someObj3', target: someObj3 }
    //     // ];



    //     // mogger = new Mogger({
    //     //     defaultConsole: fakeConsole,
    //     //     surrogateTargets: surrogateTargetsSource
    //     // });

    //     // mogger.traceObj({ target: 'someObj2' });
    //     // mogger.traceObj({ target: 'someObj3' });

    //     // someObj2.addNumbers(1, 2);
    //     // someObj3.addNumbers(1, 2);

    //     // assert.equal(3, fakeConsole.logRecorder.length);
    //     // assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
    // });

    // it('can trace a function', function() {


    //     mogger.traceObj();

    //     someObj.addNumbers(1, 2);

    //     assert.equal(1, fakeConsole.logRecorder.length);
    //     assert.equal('addNumbers', fakeConsole.logRecorder[0].message);

    // });

    // /*
    //  ------------------------------------------------------------------------------------
    //  # traceObj({ target: someObj });
    //  ------------------------------------------------------------------------------------
    //  :: regex filters can be applied to meld
    //  ------------------------------------------------------------------------------------
    // */
    // it('trace only functions that I want', function() {
    //  mogger.traceObj({
    //      target: someObj,
    //      pointcut: /addNumbers/
    //  });

    //  someObj.justReturn(1, 2);
    //  someObj.addNumbers(1, 2);

    //  assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
    //  assert.equal(true, fakeConsole.logRecorder.length === 1);
    // });


    //  ------------------------------------------------------------------------------------
    //  # trace.targets === []
    //  ------------------------------------------------------------------------------------
    //  :: each logged function will be stored in targets array
    //  ------------------------------------------------------------------------------------

    // it('store each traced function on targets', function() {

    //  //trace someObj1
    //  mogger.traceObj({ target: someObj   });

    //  //trace someObj2
    //  var someObj2 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
    //  mogger.traceObj({ target: someObj2 });

    //  //trace someObj3
    //  var someObj3 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
    //  mogger.traceObj({ target: someObj3 });

    //  assert.equal(3, mogger.targets.length);
    // });


});
