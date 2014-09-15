'use strict';

var BasePage = require('./base-page');
var configuration = require('../configuration');

/*

file:     detect-console-modal-include.js
class:    DetectConsoleModalInclude
instance: detectConsoleModalInclude

*/

module.exports = BasePage.extend({
    template: require('../templates/detect-console-modal-include')(configuration),
});
