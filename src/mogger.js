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

 (function(root, factory) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['exports',
            'colorful-logger',
            'meld',
            'meldTrace',
            'lodash'
          ],
          function (
            exports,
            ColorfulLogger,
            meld,
            meldTrace,
            _
    ){
      factory(root, exports, ColorfulLogger, meld, meldTrace, _);
    });

  // Node.js
  } else if (typeof exports !== 'undefined') {
    var ColorfulLogger = require('colorful-logger');
    var meld = require('meld');
    var meldTrace = require('meld/aspect/trace');
    var _ = require('lodash');
    factory(root, exports, ColorfulLogger, meld, meldTrace, _);
  }

}(this, function(root, Mogger, ColorfulLogger, meld, meldTrace, _) {

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

    var GetReporter = function (options) {
      this.onCall = function(info) {
        var logs = [],
            targetLog,
            mainMessage = info.method,
            isDisabled = getGlobalConfig().enabled === false,
            isIgnored = options.ignorePattern && options.ignorePattern.test(info.method);

        if(isDisabled || isIgnored){
          return false;
        }

        //before (namespace)
        if(options.before){
          logs.push(options.before);
        }

        
        // Interceptors
        var interceptorsObj = {
          globalInterceptors: config.interceptors,
          localInterceptors: options.interceptors,
          info: info
        };
        mainMessage = checkApplyInterceptors(interceptorsObj);

        //target (function)
        if(options.targetConfig){
          targetLog = options.targetConfig;
          targetLog.message = mainMessage;
        }
        else{
          targetLog = {
            message: mainMessage
          };
        }
        logs.push(targetLog);


        //colorful-logger
        if(options.showArguments){
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
          logger.log(logs);
        }

        if(showPause){
          // cancel pause made before
          clearTimeout(globalTimeoutLogId);
          // if is not canceled, shows line bellow
          setParentTimeout(logger);
        }

      }.bind(this);
      
      // onReturn:
      // onThrow:
    };

		this.traceObj = function(opt) {
      var reporter = new GetReporter(opt);
      this.meldRemover = meld(opt.target, /./, meldTrace(reporter));
		};

    this.removeMeld = function() {
      this.meldRemover && this.meldRemover.remove();
    };

	};

  return Mogger;

}));

