var ColorfulLogger = require('colorful-logger');
var _ = require('./custom-lodash');
var helpers = require('./helpers');

/**
 * Create and print logs to logger
 * @param {[object]} options [{
        globalConfig: this,
        localConfig: localOptions,
        interceptorsHelpers: interceptorsHelpers
    }]
 */
var Reporter = function (options) {

    options = options || {};
    this.interceptorsHelpers = options.interceptorsHelpers || {};

    this._logs = [];

    var defaultReporterConfig = {
        Logger                 : ColorfulLogger.Logger,
        before                 : null,
        selectedTargetConfig   : null,
        localInterceptors      : null,
    };

    // defaults to this
    _.merge(this, defaultReporterConfig);
    // global to this
    _.merge(this, options.globalConfig);
    // local to this
    _.merge(this, options.localConfig);

    var logger  = new this.Logger({
        output: this.defaultConsole
    });
    this.logger = logger;
};


Reporter.prototype.onCall = function(info) {
    if(!this.enabled){
        return false;
    }

    // Regex Filter
    if(this.ignoreRegexPattern && this.ignoreRegexPattern.test(info.method)){
        return false;
    }

    // clean all logs
    this._logs = [];

    // Render Logs
    this.renderLogs(info);

    // Pause
    if(this.showPause){
        // cancel last setTimeout because is processing
        clearTimeout(this.globalTimeoutLogId);
        // if not canceled, it shows the line bellow

        setParentTimeout(this.logger, this.waitForPause, this.pauseCallBack);
    }
};





Reporter.prototype.renderLogs = function(info) {
    var mainMessage = info.method;

    this._addBefore();

    mainMessage = this._applyInterceptors(info);

    this._addMainLog(mainMessage);

    this._renderToConsole(info, mainMessage);
};

Reporter.prototype._addBefore = function() {
    var selectedBeforeConfig, beforeLog;

    if(!this.before){
        return;
    }

    selectedBeforeConfig = this._getOrMergeLogConfiguration(
        this.globalBeforeConfig,
        this.localBeforeConfig
    );

    /*
        target (function)
    */
    if(selectedBeforeConfig){
        beforeLog = selectedBeforeConfig;
        beforeLog.message = this.before.message;
    }
    else{
        beforeLog = this.before;
    }
    this._logs.push(beforeLog);
};

Reporter.prototype._applyInterceptors = function(info) {
    /*
        Interceptors
    */
    var interceptorsObj = {
        globalInterceptors: this.globalInterceptors,
        localInterceptors: this.localInterceptors,
        info: info
    };
    return this.interceptorsHelpers.checkAndApplyInterceptor(interceptorsObj);
};

Reporter.prototype._addMainLog = function(mainMessage) {
    var selectedTargetConfig, targetLog;

    selectedTargetConfig = this._getOrMergeLogConfiguration(
        this.globalTargetConfig,
        this.localTargetConfig
    );

    /*
        target (function)
    */
    if(selectedTargetConfig){
        targetLog = selectedTargetConfig;
        targetLog.message = mainMessage;
    }
    else{
        targetLog = {
            message: mainMessage
        };
    }
    this._logs.push(targetLog);
};

Reporter.prototype._getOrMergeLogConfiguration = function(globalLogConfig, localLogConfig) {

    // var hasGlobal = globalLogConfig !== null;
    // var hasLocal = localLogConfig !== null;

    var selectedLogConfig = {};//localLogConfig || globalLogConfig;

    // merge both
    // if(hasLocal && hasGlobal){
    _.merge(selectedLogConfig, globalLogConfig);
    _.merge(selectedLogConfig, localLogConfig);
    // }

    return selectedLogConfig;
};

Reporter.prototype._renderToConsole = function(info, mainMessage) {
    /*
        Function arguments in a groupCollapsed
    */
    var wasModifiedByInterceptor = (mainMessage !== info.method);

    var willLogArguments = this.showArguments &&
        !wasModifiedByInterceptor &&
        helpers.checkRelevantArguments(info.args);

    if(willLogArguments){
        this._logs[0].logType = 'groupCollapsed';
        this.logger.log(this._logs);

        this.logger.log({
            message: info.args
        });
        this.logger.log({
            logType: 'groupEnd'
        });
    }
    else{
        this._logs[0].logType = 'log';
        this.logger.log(this._logs);
    }
};

this.globalTimeoutLogId = null;

var setParentTimeout = function(logger, wait, pauseCallBack) {
    this.globalTimeoutLogId = setTimeout(function (){
        logger.log('----------------------------------pause--------------------------');
        if(pauseCallBack){
            pauseCallBack();
        }
    }.bind(this), wait);
};

module.exports = Reporter;