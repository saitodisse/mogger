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
    this.logger = logger || new ColorfulLogger.Logger(loggerConfig);

    this.configure = function(options) {
      if(options.beforeFunction){
        this.beforeFunction = options.beforeFunction;
      }
      if(options.afterFunction){
        this.afterFunction = options.afterFunction;
      }
      if(options.cssFunction){
        this.cssFunction = options.cssFunction;
      }
    };

    this.customReporter = {
      onCall: function (info) {
        var fName = info.method;
        if(this.beforeFunction){
          fName = this.beforeFunction + fName;
        }
        if(this.afterFunction){
          fName = fName + this.afterFunction;
        }
        if(this.cssFunction){
          fName = {
            message: fName,
            css: this.cssFunction
          }
        }
        this.logger.log(fName);
      }.bind(this),
      // onReturn:
      // onThrow:
    };

		this.traceObj = function(traceFunc) {
      meld(traceFunc, /./, meldTrace(this.customReporter));
		};

	};

  return Mogger;

}));

