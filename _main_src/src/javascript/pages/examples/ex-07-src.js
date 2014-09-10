'use strict';

var Mogger = require('mogger');

/*

file:     ex-07-src.js
class:    Example07Src
instance: example07Src

*/

module.exports = function() {

    /**
     * an object with two methods
     */
    var simple_obj_1 = {
        method_1_A: function() {},
        method_1_B: function() {}
    };
    var simple_obj_2 = {
        method_2_A: function() {},
        method_2_B: function() {}
    };

    /**
     * instantiate mogger
     * add the surrogateTargets array.
     */
    var mogger = new Mogger({
        surrogateTargets: [
            {
                title: 'SIMPLE_OBJ_1',
                target: simple_obj_1
            },
            {
                title: 'SIMPLE_OBJ_2',
                target: simple_obj_2
            }
        ],
        globalBeforeConfig: {
            css: 'color: #933; font-size: 14px',
            size: 16
        }
    });

    /**
     * tracing all methods from simple_obj_1
     */
    mogger.traceObj({
        before: { message: 'Simple Obj 1' },
        targetTitle: 'SIMPLE_OBJ_1'
    });

    mogger.traceObj({
        before: { message: 'Obj 2' },
        targetTitle: 'SIMPLE_OBJ_2'
    });


    /**
     * call the simple_obj_1 methods
     * tip: see console.logs message
     */
    var callSources = function () {
        simple_obj_1.method_1_A();
        simple_obj_1.method_1_B();
        simple_obj_2.method_2_A();
        simple_obj_2.method_2_B();
    };

    callSources();

};
