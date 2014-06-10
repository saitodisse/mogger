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
    define(['colorful-logger', 'meld', 'meldTrace', 'exports'], function (ColorfulLogger, meld, meldTrace, exports) {
      factory(root, exports, ColorfulLogger, meld, meldTrace);
    });

  // Node.js
  } else if (typeof exports !== 'undefined') {
    var ColorfulLogger = require('colorful-logger');
    var meld = require('meld');
    var meldTrace = require('meld/aspect/trace');
    factory(root, exports, ColorfulLogger, meld, meldTrace);
  }

}(this, function(root, Mogger, ColorfulLogger, meld, meldTrace) {

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
    config = config || {};
    
    //get logger and send configuration to him
    var logger = config.logger;
    var loggerConfig = config.loggerConfig;
    logger = this.logger = logger || new ColorfulLogger.Logger(loggerConfig);
    
    //showPause when to much time without any log
    var showPause = config.showPause || false;


    var GetReporter = function (options) {
      if(options.before){
        this.before = options.before;
      }
      if(options.targetConfig){
        this.targetConfig = options.targetConfig;
      }
      if(options.showArguments){
        this.showArguments = options.showArguments;
      }

      this.onCall = function(info) {
        var logs = [], targetLog;

        //before (namespace)
        if(this.before){
          logs.push(this.before);
        }

        //target (function)
        if(this.targetConfig){
          targetLog = this.targetConfig;
          targetLog.message = info.method;
        }
        else{
          targetLog = {
            message: info.method
          };
        }
        logs.push(targetLog);


        //colorful-logger
        if(this.showArguments){
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

