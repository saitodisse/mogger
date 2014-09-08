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

    var defaults = _.merge(defaultConfig, options);

    // merge all options to this
    helpers.merge(this, defaults);
};

Mogger.prototype.traceObj = function(localOptions) {

    var surrogateTargetItem = this._selectTargetFromSurrogateTargets();
    var targetObject = surrogateTargetItem.target;

    var pointcut = this.pointcut || /./;

    var reporter = this._createReporter(localOptions);

    // add targetObject to _targets list
    this._targets.push({
        target: targetObject,
        meldRemover: meld(targetObject, pointcut, traceMeld(reporter))
    });
};

Mogger.prototype._createReporter = function(localOptions) {
    return new this.Reporter({
        globalConfig: this,
        localConfig: localOptions,
        interceptorsHelpers: interceptorsHelpers
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
        throw new Error('cannot find target \'' + this._target + '\'');
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
