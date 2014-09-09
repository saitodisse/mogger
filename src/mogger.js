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
var traceMeld           = require('./trace-aspect');
var helpers             = require('./helpers');
var defaultConfig       = require('./default-config');
var interceptorsHelpers = require('./interceptors-helpers');

////////////////////
// Mogger DEFINITION
////////////////////
var Mogger = function (options) {

    this._targets = [];

    var mergedConfig = _.merge(defaultConfig, options);

    // merge all options to this
    helpers.merge(this, mergedConfig);
};

Mogger.prototype.traceObj = function(localOptions) {

    if(!localOptions){
        throw new Error('you must provide options on traceObj');
    }

    if(!_.isString(localOptions.target)){
        throw new Error('localOptions.target must be a string');
    }

    this._target = localOptions.target;

    var surrogateTargetItem = this._selectTargetFromSurrogateTargets();

    var pointcut = this.pointcut || /./;

    var reporter = this._createReporter(localOptions);

    this._trace(surrogateTargetItem, pointcut, reporter);
};

Mogger.prototype._createReporter = function(localOptions) {
    return new this.Reporter({
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
    // add targetObject to _targets list
    this._targets.push({
        surrogateTargetItem: surrogateTargetItem,
        meldRemover: meld(surrogateTargetItem.targetObject, pointcut, traceMeld(reporter))
    });
};

/**
 * [gets target real object from surrogateTargets]
 * @return {[object]}              [selected target object]
 */
Mogger.prototype._selectTargetFromSurrogateTargets = function() {
    var isArray = _.isArray(this.surrogateTargets);
    var isEmpty = _.isEmpty(this.surrogateTargets);

    console.log('this.surrogateTargets', this.surrogateTargets);

    if(!isArray || isEmpty){
        throw new Error('surrogateTargets can\'t be empty');
    }

    var isStringTarget = _.isString(this._target);
    if(!isStringTarget){
        throw new Error('the target must be a string');
    }

    // find By Title
    var surrogateTargetSelected = _.find(this.surrogateTargets, { 'title': this._target });
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


module.exports = Mogger;
