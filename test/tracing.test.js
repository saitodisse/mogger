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


var assert      = require('assert');
var Mogger      = require('../src/new-mogger'),
    fakeConsole = require('./fake-console'),
    tracer
;

describe('Tracing:', function(){

    var someObj = {
        addNumbers: function (arg1, arg2) {
            return arg1 + arg2;
        },
        justReturn: function (arg1) {
            return arg1;
        }
    };

    beforeEach(function(){
        tracer = new Mogger({
            stdout: fakeConsole
        });
        fakeConsole.logRecorder = [];
    });

    afterEach(function(){
        tracer.removeAllTraces();
    });

    /*
        ------------------------------------------------------------------------------------
        # traceObj({ target: someObj });
        ------------------------------------------------------------------------------------
        :: each function that is called in someObj will generate a log output
        ------------------------------------------------------------------------------------
    */
    it('can trace a function', function() {
        tracer.traceObj({
            target: someObj
        });

        someObj.addNumbers(1, 2);

        assert.equal(1, fakeConsole.logRecorder.length);
        assert.equal('addNumbers', fakeConsole.logRecorder[0].message);

    });

    // /*
    //  ------------------------------------------------------------------------------------
    //  # traceObj({ target: someObj });
    //  ------------------------------------------------------------------------------------
    //  :: regex filters can be applied to meld
    //  ------------------------------------------------------------------------------------
    // */
    // it('trace only functions that I want', function() {
    //  tracer.traceObj({
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
    //  tracer.traceObj({ target: someObj   });

    //  //trace someObj2
    //  var someObj2 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
    //  tracer.traceObj({ target: someObj2 });

    //  //trace someObj3
    //  var someObj3 = { addNumbers: function (arg1, arg2) { return arg1 + arg2; } };
    //  tracer.traceObj({ target: someObj3 });

    //  assert.equal(3, tracer.targets.length);
    // });


});
