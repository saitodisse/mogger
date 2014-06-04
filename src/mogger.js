(function(root, factory) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['colorful-logger', 'meld', 'meld/aspect/trace', 'exports'], function (ColorfulLogger, meld, traceMeld, exports) {
      factory(root, exports, ColorfulLogger, meld, traceMeld);
    });

  // Node.js
  } else if (typeof exports !== 'undefined') {
    var ColorfulLogger = require('colorful-logger');
    var meld = require('meld');
    var traceMeld = require('meld/aspect/trace');
    factory(root, exports, ColorfulLogger, meld, traceMeld);
  }

}(this, function(root, Mogger, ColorfulLogger, meld, traceMeld) {

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
      meld(traceFunc, /./, traceMeld(customReporter));
		};

	};

  return Mogger;

}));

