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

    var customReporter = {
      onCall: function (info) {
        var fName = info.method;
        this.logger.log(fName);
      }.bind(this),
      // onReturn:
      // onThrow:
    };

		this.traceObj = function(traceFunc) {
      meld(traceFunc, /./, meldTrace(customReporter));
		};

	};

  return Mogger;

}));

