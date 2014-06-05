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

	/*******************************
		Mogger.Tracer
	*******************************/
	Mogger.Tracer = function (config){
    var logger = config && config.logger;
    var loggerConfig = config && config.loggerConfig;
    logger = this.logger = logger || new ColorfulLogger.Logger(loggerConfig);

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

      }.bind(this);
      
      // onReturn:
      // onThrow:
    };

		this.traceObj = function(opt) {
      var reporter = new GetReporter(opt);
      meld(opt.target, /./, meldTrace(reporter));
		};

	};

  return Mogger;

}));

