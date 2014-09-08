var ColorfulLogger = require('colorful-logger');
var _ = require('lodash');
var interceptorsHelpers = require('./interceptors-helpers');
var helpers = require('./helpers');

var Reporter = function (globalOptions, localOptions) {
    this.logs = [];

    var defaults = _.merge({
        Logger              : ColorfulLogger.Logger,
        before              : null,
        selectedTargetConfig   : null,
        localInterceptors   : null,
    }, globalOptions);

    // merge global to this
    helpers.merge(this, defaults);
    // merge local to this
    helpers.merge(this, localOptions);


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

    this._addTitle();

    mainMessage = this._applyInterceptors();

    this._addMainLog(mainMessage);

    this._renderToConsole(info, mainMessage);
};

Reporter.prototype._addTitle = function() {
    /*
        title (first column / namespace)
    */
    if(this.before){
        this.logs.push(this.before);
    }
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
    return interceptorsHelpers.checkAndApplyInterceptor(interceptorsObj);
};

Reporter.prototype._addMainLog = function(mainMessage) {
    var selectedTargetConfig, targetLog;
    /*
        selectedTargetConfig local or global
    */
    if(typeof this.localTargetConfig !== 'undefined' && typeof this.localTargetConfig === 'undefined'){
        selectedTargetConfig = this.localTargetConfig;
    }
    else{
        selectedTargetConfig = defaults(this.globalTargetConfig,  this.localTargetConfig);
    }

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
    this.logs.push(targetLog);
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
        this.logs[0].logType = 'groupCollapsed';
        this.logger.log(this.logs);

        this.logger.log({
            message: info.args
        });
        this.logger.log({
            logType: 'groupEnd'
        });
    }
    else{
        this.logs[0].logType = 'log';
        this.logger.log(this.logs);
    }
};

var globalTimeoutLogId = null;

var setParentTimeout = function(logger, wait, pauseCallBack) {
    globalTimeoutLogId = setTimeout(function (){
        logger.log('----------------------------------pause--------------------------');
        if(pauseCallBack){
            pauseCallBack();
        }
    }.bind(this), wait);
};

var defaults = _.partialRight(_.assign, function(a, b) {
  return typeof a == 'undefined' ? b : a;
});



module.exports = Reporter;