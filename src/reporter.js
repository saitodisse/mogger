var _ = require('lodash');
var checkApplyInterceptors = require('./check-interceptors');

var Reporter = function (options) {
    options = options || {};

    this.options = _.merge({
        enabled             : true,
        ignoreRegexPattern  : /^$/,
        showArguments       : false,
        showPause           : true,
        before              : undefined,
        interceptors        : undefined,
        targetConfig        : {},
        defaultTargetConfig : {},
        Logger              : undefined,
    }, options);

    this.initialize();
};

Reporter.prototype.initialize = function() {
    this.logs                = [];

    this.interceptors        = this.options.interceptors;
    this.enabled             = this.options.enabled;
    this.ignoreRegexPattern  = this.options.ignoreRegexPattern;
    this.showArguments       = this.options.showArguments;
    this.showPause           = this.options.showPause;
    this.before              = this.options.before;
    this.targetConfig        = this.options.targetConfig;

    // instantiate the logger
    var logger  = new this.options.Logger();
    this.logger = logger;
};

var checkRelevantArguments = function(args) {
  if(args.length === 0){
    return false;
  }

  for (var i = 0; i < args.length; i++) {
    var argument = args[i];

    var isString = _.isString(argument) && argument.length > 0;
    var isNumber = _.isNumber(argument);
    var isBoolean = _.isBoolean(argument);
    var isArray = _.isArray(argument) && argument.length > 0;
    var isEmpty = _.isEmpty(argument);
    var isObject = _.isObject(argument);

    var hasValues = isString || isNumber || isBoolean || isArray || (isObject && !isEmpty);
    if(hasValues){
      return true;
    }
  }
  return false;
};

var globalTimeoutLogId = null;

var setParentTimeout = function(logger) {
    globalTimeoutLogId = setTimeout(function (){
        logger.log('----------------------------------pause--------------------------');
    }.bind(this), 100);
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

    var defaults = _.partialRight(_.assign, function(a, b) {
      return typeof a == 'undefined' ? b : a;
    });


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
    mainMessage = checkApplyInterceptors(interceptorsObj);
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
        checkRelevantArguments(info.args);

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

module.exports = Reporter;