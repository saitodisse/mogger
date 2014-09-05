var ColorfulLogger = require('colorful-logger');
var _ = require('lodash');
var interceptorsHelpers = require('./interceptors-helpers');
var helpers = require('./helpers');

var Reporter = function (mogger, localOptions) {
    this.logs = [];

    var defaults = _.merge({
        Logger              : ColorfulLogger.Logger,
        before              : null,
        localTargetConfig   : null,
        localInterceptors   : null,
    }, mogger);

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

    var targetLog,
        mainMessage = info.method,
        isIgnored = this.ignoreRegexPattern && this.ignoreRegexPattern.test(info.method),
        localTargetConfig,
        interceptorsObj,
        wasModifiedByInterceptor,
        willLogArguments
    ;

    // FIXME: why I had to declare this.options.enabled explicit?
    // console.log('this.enabled:', this.enabled);

    if(!this.enabled){
        return false;
    }
    if(isIgnored){
        return false;
    }

    /*
        before (first column / namespace)
    */
    if(this.before){
        this.logs.push(this.before);
    }

    /*
        Interceptors
    */
    interceptorsObj = {
        globalInterceptors: this.globalInterceptors,
        localInterceptors: this.localInterceptors,
        info: info
    };
    mainMessage = interceptorsHelpers.checkAndApplyInterceptor(interceptorsObj);
    wasModifiedByInterceptor = (mainMessage !== info.method);

    /*
        localTargetConfig local or global
    */
    if(typeof this.localTargetConfig !== 'undefined' && typeof this.localTargetConfig === 'undefined'){
        localTargetConfig = this.localTargetConfig;
    }
    else{
        localTargetConfig = defaults(this.globalTargetConfig,  this.localTargetConfig);
    }

    /*
        target (function)
    */
    if(localTargetConfig){
        targetLog = localTargetConfig;
        targetLog.message = mainMessage;
    }
    else{
        targetLog = {
            message: mainMessage
        };
    }
    this.logs.push(targetLog);


    /*
        Function arguments in a groupCollapsed
    */
    willLogArguments = this.showArguments &&
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

    /*
        pause
    */
    if(this.showPause){
        // cancel pause made before
        clearTimeout(this.globalTimeoutLogId);
        // if is not canceled, it shows the line bellow
        setParentTimeout(this.logger);
    }
};

var globalTimeoutLogId = null;

var setParentTimeout = function(logger) {
    globalTimeoutLogId = setTimeout(function (){
        logger.log('----------------------------------pause--------------------------');
    }.bind(this), 100);
};

var defaults = _.partialRight(_.assign, function(a, b) {
  return typeof a == 'undefined' ? b : a;
});



module.exports = Reporter;