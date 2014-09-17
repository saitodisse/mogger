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

var meld                = require('meld');
var _                   = require('lodash');
var traceAspect         = require('./trace-aspect');
var defaultConfig       = require('./default-config');
var interceptorsHelpers = require('./interceptors-helpers');
var Reporter            = require('./reporter');

////////////////////
// Mogger DEFINITION
////////////////////
var Mogger = function (options) {

    this._targets = [];

    // defaults from ./default-config.js
    _.merge(this, defaultConfig);

    // override with constructor options
    _.merge(this, options);

    this.surrogateTargets = options.surrogateTargets;
};

Mogger.prototype.traceObj = function(localOptions) {

    if(!localOptions){
        throw new Error('you must provide options on traceObj');
    }

    if(!_.isString(localOptions.targetTitle)){
        throw new Error('localOptions.targetTitle must be a string');
    }

    this._targetTitle = localOptions.targetTitle;

    var surrogateTargetItem = this._selectTargetFromSurrogateTargets();

    var pointcut = this.pointcut || /./;

    var reporter = this._createReporter(localOptions);

    this._trace(surrogateTargetItem, pointcut, reporter);
};

Mogger.prototype._createReporter = function(localOptions) {
    return new Reporter({
        globalConfig: this,
        localConfig: localOptions,
        interceptorsHelpers: interceptorsHelpers
    });
};

/**
 * trace a target object and adds to _targets list
 * @param  {object} surrogateTargetItem
 * @param  {regex} pointcut
 * @param  {instance} reporter
 */
Mogger.prototype._trace = function(surrogateTargetItem, pointcut, reporter) {
    var toRemove = meld(surrogateTargetItem.target, pointcut, traceAspect(reporter));
    // add targetObject to _targets list
    this._targets.push({
        surrogateTargetItem: surrogateTargetItem,
        meldRemover: toRemove
    });
};

/**
 * [gets target real object from surrogateTargets]
 * @return {[object]}              [selected target object]
 */
Mogger.prototype._selectTargetFromSurrogateTargets = function() {
    var isArray = _.isArray(this.surrogateTargets);
    var isEmpty = _.isEmpty(this.surrogateTargets);

    if(!isArray || isEmpty){
        throw new Error('surrogateTargets can\'t be empty');
    }

    var isStringTarget = _.isString(this._targetTitle);
    if(!isStringTarget){
        throw new Error('the targetTitle must be a string');
    }

    // find By Title
    var surrogateTargetSelected = _.find(this.surrogateTargets, { 'title': this._targetTitle });
    return surrogateTargetSelected;
};


/**
 * loop over all target and remove them from meld AOP tracer
 */
Mogger.prototype.removeAllTraces = function() {
    this._targets.forEach(function(target) {
        target.meldRemover && target.meldRemover.remove();
    });
};


if(typeof window !== 'undefined'){
    window.Mogger = Mogger;
}

module.exports = Mogger;


