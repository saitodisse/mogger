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

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports',
            'colorful-logger',
            'meld',
            'traceMeld',
            'lodash'
          ],
          function (
            exports,
            ColorfulLogger,
            meld,
            traceMeld,
            _
    ){
      factory(root, exports, ColorfulLogger, meld, traceMeld, _);
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    var ColorfulLogger = require('colorful-logger');
    var meld = require('meld');
    var traceMeld = require('meld/aspect/trace');
    var _ = require('lodash');
    factory(root, exports, ColorfulLogger, meld, traceMeld, _);
  } else {
    // Browser globals
    factory(root, (root.Mogger = {}), root.ColorfulLogger, root.meld, root.traceMeld, root._);
  }
}(this, function(root, Mogger, ColorfulLogger, meld, traceMeld, _) {

  var globalTimeoutLogId = null;
  var setParentTimeout = function(logger) {
    globalTimeoutLogId = setTimeout(function (){
      logger.log('----------------------------------pause--------------------------');
    }.bind(this), 100);
  };

  /*******************************
    Mogger.Tracer
  *******************************/
  Mogger.Tracer = function (config){
    // global configuration
    config = config || {};
    this.globalConfig = config;
    var getGlobalConfig = function() {
      return this.globalConfig;
    }.bind(this);

    //get logger and send configuration to him
    var logger = config.logger;
    var loggerConfig = config.loggerConfig;
    logger = this.logger = logger || new ColorfulLogger.Logger(loggerConfig);

    //showPause when to much time without any log
    var showPause = config.showPause || false;

    /*
      interceptorsObj:
      {
        globalInterceptors: config.interceptors,
        localInterceptors: options.interceptors,
        info: info
      }
    */
    var checkExistingInterceptors = function(interceptorsObj) {
      var hasLocalInterceptors = !_.isUndefined(interceptorsObj.localInterceptors);
      var hasGlobalInterceptors = !_.isUndefined(interceptorsObj.globalInterceptors);
      return (hasLocalInterceptors || hasGlobalInterceptors);
    };

    var matchInterceptor = function(interceptor, methodName) {
      var filterRegex = interceptor.filterRegex;
      var matchFilterResult = filterRegex.test(methodName);
      if(matchFilterResult){
        return interceptor;
      }
      return false;
    };

    var selectInterceptor = function(interceptor, methodName) {
      // interceptor Array
      if(interceptor && _.isArray(interceptor)){
        for (var i = 0; i < interceptor.length; i++) {
          var interceptorItem = interceptor[i];
          if( matchInterceptor(interceptorItem, methodName) ){
            return interceptorItem;
          }
        }
      }
      // interceptor single obj
      else if(interceptor && !_.isArray(interceptor)){
        return matchInterceptor(interceptor, methodName);
      }

      // no filter match
      return false;
    };

    var applyInterceptor = function(interceptorsObj, interceptor) {
      return interceptor.callback(interceptorsObj.info);
    };

    var checkApplyInterceptors = function(interceptorsObj) {
      if(!checkExistingInterceptors(interceptorsObj)){
        return interceptorsObj.info.method;
      }
      
      var interceptor = selectInterceptor(interceptorsObj.localInterceptors,  interceptorsObj.info.method);
      if (interceptor === false) {
        interceptor = selectInterceptor(interceptorsObj.globalInterceptors, interceptorsObj.info.method);
      }

      if (interceptor) {
        return applyInterceptor(interceptorsObj, interceptor);
      }
      else {
        return interceptorsObj.info.method;
      }
    };

    var defaults = _.partialRight(_.assign, function(a, b) {
      return typeof a == 'undefined' ? b : a;
    });

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

        // console.log('<', argument, '>',
        //             '\nisString = ', isString,
        //             '\nisNumber = ', isNumber,
        //             '\nisBoolean = ', isBoolean,
        //             '\nisArray = ', isArray,
        //             '\nisEmpty = ', isEmpty,
        //             '\nisObject = ', isObject
        //             );
        
        var hasValues = isString || isNumber || isBoolean || isArray || (isObject && !isEmpty);
        if(hasValues){
          return true;
        }
      }
      return false;
    };

    var GetReporter = function (options) {
      this.onCall = function(info) {
        var logs = [],
            targetLog,
            mainMessage = info.method,
            isDisabled = getGlobalConfig().enabled === false || options.enabled === false,
            isIgnored = options.ignorePattern && options.ignorePattern.test(info.method),
            beforeConfig,
            targetConfig,
            interceptorsObj,
            wasModifiedByInterceptor,
            willLogArguments,
            showArguments = !_.isUndefined(options.showArguments) ? options.showArguments : config.showArguments
        ;

        if(isDisabled || isIgnored){
          return false;
        }

        /*
            before (first column / namespace)
        */
        beforeConfig = defaults(options.before, getGlobalConfig().before);
        if(beforeConfig){
          logs.push(beforeConfig);
        }
        
        /*
            Interceptors
        */
        interceptorsObj = {
          globalInterceptors: config.interceptors,
          localInterceptors: options.interceptors,
          info: info
        };
        mainMessage = checkApplyInterceptors(interceptorsObj);
        wasModifiedByInterceptor = (mainMessage !== info.method);

        /*
            targetConfig local or global
        */
        if(typeof getGlobalConfig().targetConfig !== 'undefined' && typeof options.targetConfig === 'undefined'){
          targetConfig = getGlobalConfig().targetConfig;
        }
        else{
          targetConfig = defaults(options.targetConfig, getGlobalConfig().targetConfig);
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
        logs.push(targetLog);


        /*
            Function arguments in a groupCollapsed
        */
        willLogArguments = showArguments &&
                           !wasModifiedByInterceptor &&
                           checkRelevantArguments(info.args);
        
        if(willLogArguments){
          logs[0].logType = 'groupCollapsed';
          logger.log(logs);

          logger.log({
            message: info.args
          });
          logger.log({
            logType: 'groupEnd'
          });
        }
        else{
          logs[0].logType = 'log';
          logger.log(logs);
        }

        /*
            pause
        */
        if(showPause){
          // cancel pause made before
          clearTimeout(globalTimeoutLogId);
          // if is not canceled, it shows the line bellow
          setParentTimeout(logger);
        }

      }.bind(this);
      
      // other things that can be catch in the future
      //    onReturn:
      //    onThrow:
    };

    this.targets = [];


    // ----------------------------
    // traceObj
    // ----------------------------
    // register one object to be monitored
    // each function will be catched here thanks to AOP meld/aspect/trace
    // ----------------------------
		this.traceObj = function(opt) {
      var reporter = new GetReporter(opt);
      var target = opt.target;
      
      // gets target real object from surrogateTargets,
      // only if its is an string
      var surrogateTargets = config.surrogateTargets;
      if(surrogateTargets && _.isString(target)){
        target = surrogateTargets[target];
      }

      this.targets.push({
        meldRemover: meld(target, /./, traceMeld(reporter)),
        options: opt
      });
		};

    // ----------------------------
    // removeAllTraces
    // ----------------------------
    // loop over all target and remove them from meld AOP tracer
    // ----------------------------
    this.removeAllTraces = function() {
      this.targets.forEach(function(target) {
        target.meldRemover && target.meldRemover.remove();
      });
    };

	};

  return Mogger;

}));

