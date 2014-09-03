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

// var meld = require('meld');
// var traceMeld = require('meld/aspect/trace');
var ColorfulLogger = require('colorful-logger');
var _ = require('lodash');

////////////////////
// Mogger DEFINITION
////////////////////
var Mogger = function (options) {
  options = options || {};
  this.options = _.merge({
    logger: ColorfulLogger.Logger,
    stdout: console.log
  }, options);
  // this.logger = this.options.logger;
};

  // new ColorfulLogger.Logger(loggerConfig)

module.exports = Mogger;
  // return function (options) {
  //   this.options = _.merge(options, {
  //     logger: console.log
  //   });
  //   //this.logger = this.options.logger;
  // };



