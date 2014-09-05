var ColorfulLogger = require('colorful-logger');
var _ = require('lodash');
var interceptorsHelpers = require('./interceptors-helpers');
var helpers = require('./helpers');

var Reporter = function (options) {
    options = options || {};

    this.options = _.merge({
        Logger              : ColorfulLogger.Logger,
        ignoreRegexPattern  : /^$/,
        before              : null,
        interceptors        : null,
        stdout              : null,
        targetConfig        : {},
        defaultTargetConfig : {},
        enabled             : true
    }, options);

    this.initialize();
};

Reporter.prototype.initialize = function() {
    this.logs                = [];

    this.Logger              = this.options.Logger;
    this.stdout              = this.options.stdout;
    this.interceptors        = this.options.interceptors;
    this.enabled             = this.options.enabled;
    this.ignoreRegexPattern  = this.options.ignoreRegexPattern;
    this.showArguments       = this.options.showArguments;
    this.showPause           = this.options.showPause;
    this.before              = this.options.before;
    this.targetConfig        = this.options.targetConfig;

    // instantiate the logger
    var logger  = new this.Logger({
        output: this.stdout
    });
    this.logger = logger;
};


Reporter.prototype.onCall = function(info) {
    var targetLog,
        mainMessage = info.method,
        isIgnored = this.ignoreRegexPattern && this.ignoreRegexPattern.test(info.method),
        targetConfig,
        interceptorsObj,
        wasModifiedByInterceptor,
        willLogArguments
    ;

    // FIXME: why I had to declare this.options.enabled explicit?
    // console.log('this.enabled:', this.enabled);

    if(!this.enabled || isIgnored){
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
        globalInterceptors: this.interceptors,
        localInterceptors: this.options.interceptors,
        info: info
    };
    mainMessage = interceptorsHelpers.checkAndApplyInterceptor(interceptorsObj);
    wasModifiedByInterceptor = (mainMessage !== info.method);

    /*
        targetConfig local or global
    */
    if(typeof this.targetConfig !== 'undefined' && typeof this.options.targetConfig === 'undefined'){
        targetConfig = this.targetConfig;
    }
    else{
        targetConfig = defaults(this.defaultTargetConfig, this.targetConfig);
    }

    /*
        target (function)
    */
    if(targetConfig){
        targetLog = targetConfig;
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