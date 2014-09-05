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

var meld          = require('meld');
var _             = require('lodash');
var traceMeld     = require('./trace-aspect');
var helpers       = require('./helpers');
var Reporter      = require('./reporter');
var defaultConfig = require('./default-config');

////////////////////
// Mogger DEFINITION
////////////////////
var Mogger = function (options) {

    var defaults = _.merge(defaultConfig, options);

    // merge all options to this
    helpers.merge(this, defaults);
};

Mogger.prototype.traceObj = function(localOptions) {

    // all "globalOptions" (this.option) are merged with "localOptions"

    var reporter = new Reporter(this, localOptions);
    var target = this.target;


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
    var pointcut = this.pointcut || /./;
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
