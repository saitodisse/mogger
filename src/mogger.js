(function(root, factory) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['colorful-logger', 'exports'], function (ColorfulLogger, exports) {
      factory(root, exports, ColorfulLogger);
    });

  // Node.js
  } else if (typeof exports !== 'undefined') {
    var ColorfulLogger = require('colorful-logger');
    factory(root, exports, ColorfulLogger);
  }

}(this, function(root, Mogger, ColorfulLogger) {

	/*******************************
		Mogger.Tracer
	*******************************/
	Mogger.Tracer = function (config){

		this.trace = function() {
			this.logger = new ColorfulLogger.Logger(config.loggerConfig);
		}

	};

  return Mogger;

}));

