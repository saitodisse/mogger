'use strict';

var Mogger = require('mogger');

/*

file:     ex-02-src.js
class:    Example02Src
instance: example02Src

*/

module.exports = function() {

    /**
     * an object with two methods
     */
    var simple_obj = {
        methodA: function() {},
        methodB: function() {}
    };

    /**
     * instantiate mogger
     * add the surrogateTargets array.
     */
    var mogger = new Mogger({
        surrogateTargets: [{
            title: 'SIMPLE_OBJ',
            target: simple_obj
        }]
    });

    /**
     * tracing all methods from simple_obj
     */
    mogger.traceObj({
        before: { message: 'Simple Obj: ' },
        targetTitle: 'SIMPLE_OBJ'
    });


    /**
     * call the simple_obj methods
     * tip: see console.logs message
     */
    var callSources = function () {
        simple_obj.methodA();
        simple_obj.methodB();
    };

    callSources();

};
