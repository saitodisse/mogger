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

var meld      = require('meld');
var _         = require('lodash');
var traceMeld = require('./trace-aspect');
var helpers   = require('./helpers');
var Reporter  = require('./reporter');

////////////////////
// Mogger DEFINITION
////////////////////
var Mogger = function (options) {
    options = options || {};

    this.options = _.merge({
        stdout        : console,
        enabled       : true,
        showArguments : false,
        showPause     : true,
    }, options);

    this.initialize();
};

Mogger.prototype.initialize = function() {
    this.targets = [];
    this.stdout = this.options.stdout;
};


Mogger.prototype.traceObj = function(localOptions) {

    // all "globalOptions" (this.option) are merged with "localOptions"
    var optionsMerged = helpers.merge(this.options, localOptions);

    var reporter = new Reporter(optionsMerged);
    var target = optionsMerged.target;


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

    // var pointcut = optionsMerged.pointcut || /./;
    // this.targets.push({
    //   meldRemover: meld(target, pointcut, traceMeld(reporter)),
    //   options: optionsMerged
    // });
    //
    var pointcut = optionsMerged.pointcut || /./;
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
