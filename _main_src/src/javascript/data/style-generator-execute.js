'use strict';

var Mogger = require('mogger');

/*

file:     ex-06-src.js
class:    Example06Src
instance: example06Src

*/

module.exports = function() {
    /**
     * an object with two methods
     */
    var simple_obj_1 = {
        method_1_A: function() {},
        method_1_B: function() {}
    };

    this.surrogateTargetsList = [
        {
            title: 'SIMPLE_OBJ_1',
            target: simple_obj_1
        },
    ];

    this.setModel = function(model) {
        this.styleGenModel = model;
    };

    this.createMogger = function () {
        this.mogger = new Mogger({
            surrogateTargets: this.surrogateTargetsList,
            showPause: false
        });

        this.mogger.traceObj({
            before: { message: 'Simple Obj 1' },
            localBeforeConfig: { css: this.styleGenModel.beforeCss, size: this.styleGenModel.beforeSize },

            targetTitle: 'SIMPLE_OBJ_1',
            localTargetConfig: { css: this.styleGenModel.targetCss }
        });
    };

    this.clearConsole = function () {
        this.mogger.removeAllTraces();
        this.mogger.defaultConsole.clear();
    };

    this.callSources = function () {
        simple_obj_1.method_1_A();
        simple_obj_1.method_1_B();
        simple_obj_1.method_1_A();
        simple_obj_1.method_1_B();
    };

};
