'use strict';

var Mogger = require('mogger');

/*

file:     ex-11-src.js
class:    Example11Src
instance: example11Src

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
        globalInterceptors: {
            filterRegex: /^.*_(A|B)/i,
            callback: function(info) {
                var arg0 = '', arg1 = '';
                if(info.args[0]){
                    arg0 = info.args[0];
                }
                if(info.args[1]){
                    arg1 = ', ' + info.args[1];
                }

                return info.method + '(' + arg0 + arg1 + ')';
            }
        }
    });

    /**
     * tracing all methods from simple_obj_1
     */
    mogger.traceObj({
        before: { message: 'Simple Obj 1' },
        localBeforeConfig: { css: 'color: #266;', size: 16 },
        targetTitle: 'SIMPLE_OBJ_1'
    });

    mogger.traceObj({
        before: { message: 'Obj 2' },
        localBeforeConfig: { css: 'color: #626;', size: 16 },
        targetTitle: 'SIMPLE_OBJ_2'
    });


    /**
     * call the simple_obj_1 methods
     * tip: see console.logs message
     */
    var callSources = function () {
        simple_obj_1.method_1_A(1,2);
        simple_obj_1.method_1_B('A', 'b');
        simple_obj_2.method_2_A(1);
        simple_obj_2.method_2_B();
    };

    callSources();

};
