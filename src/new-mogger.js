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

var meld = require('meld');
var traceMeld = require('meld/aspect/trace');
var _ = require('lodash');
var Reporter = require('./reporter');

////////////////////
// Mogger DEFINITION
////////////////////
var Mogger = function (options) {
    options = options || {};

    this.options = _.merge({
        stdout: console
    }, options);

    this.initialize();
};

Mogger.prototype.initialize = function() {
    this.targets = [];
    this.stdout = this.options.stdout;
};


Mogger.prototype.traceObj = function(opt) {
    var reporter = new Reporter({
        stdout: this.stdout
    });
    var target = opt.target;

    // /**
    //  * surrogateTargets
    //  * gets target real object from surrogateTargets
    //  */

    // // global surrogateTargets
    // var surrogateTargets = config.surrogateTargets;

    // var isArraySurrogateTargets = surrogateTargets && _.isArray(surrogateTargets);
    // var isStringTarget = _.isString(target);

    // if(isArraySurrogateTargets && isStringTarget){
    //   // find By Title
    //   var surrogateTargetSelected = _.find(surrogateTargets, { 'title': target });
    //   if(!surrogateTargetSelected){
    //     throw new Error('cannot find surrogateTarget { title: \'' + target + '\' }' + ' on surrogateTargets list: \n' + JSON.stringify(surrogateTargets, ' ', 2));
    //   }
    //   target = surrogateTargetSelected.target;
    // }

    // var pointcut = opt.pointcut || /./;
    // this.targets.push({
    //   meldRemover: meld(target, pointcut, traceMeld(reporter)),
    //   options: opt
    // });
    //
    var pointcut = opt.pointcut || /./;
    meld(target, pointcut, traceMeld(reporter));
};


/**
 * loop over all target and remove them from meld AOP tracer
 */
Mogger.prototype.removeAllTraces = function() {
    this.targets.forEach(function(target) {
        target.meldRemover && target.meldRemover.remove();
    });
};


module.exports = Mogger;
